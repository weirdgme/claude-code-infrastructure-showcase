# PowerShell Scripting

Comprehensive guide to PowerShell scripting for system administration, automation, and remote management.

## PowerShell Fundamentals

### Cmdlets and Pipeline

PowerShell uses verb-noun cmdlets that pass objects (not text) through the pipeline:

```powershell
# Basic cmdlets
Get-Process | Where-Object {$_.CPU -gt 100} | Sort-Object CPU -Descending
Get-Service | Select-Object Name, Status | Format-Table
Get-ChildItem *.log | Export-Csv "files.csv" -NoTypeInformation

# Objects have properties and methods
$process = Get-Process -Name "powershell" | Select-Object -First 1
$process | Get-Member
$process.CPU
$process.WorkingSet

# Filter, group, measure
Get-Process | Where-Object {$_.WorkingSet -gt 100MB}
Get-Service | Group-Object Status
Get-ChildItem -Recurse | Measure-Object -Property Length -Sum
```

### Variables and Data Types

```powershell
# Variables
$name = "Server01"
$count = 42
$enabled = $true

# Arrays
$servers = @("web01", "web02", "web03")

# Hash tables
$config = @{
    Server = "web01"
    Port = 443
    Enabled = $true
}

# Typed variables
[string]$name = "Test"
[int]$number = 42
[datetime]$date = Get-Date
```

## Script Structure and Functions

### Script Template

```powershell
<#.SYNOPSIS Brief description #>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][string]$ServerName,
    [int]$Timeout = 30
)
Write-Verbose "Processing server: $ServerName"
```

### Functions

```powershell
function Test-ServiceStatus {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true, ValueFromPipeline=$true)]
        [string[]]$ServiceName,

        [ValidateSet('Running', 'Stopped')]
        [string]$ExpectedStatus = 'Running'
    )

    begin {
        $results = @()
    }

    process {
        foreach ($name in $ServiceName) {
            $service = Get-Service -Name $name -ErrorAction SilentlyContinue
            if ($service) {
                $results += [PSCustomObject]@{
                    Name = $name
                    Status = $service.Status
                    IsExpected = ($service.Status -eq $ExpectedStatus)
                }
            }
        }
    }

    end {
        return $results
    }
}

# Usage
Test-ServiceStatus -ServiceName "WinRM", "W32Time"
"WinRM", "Spooler" | Test-ServiceStatus
```

## Error Handling

### Try-Catch-Finally

```powershell
function Copy-FileWithRetry {
    param([string]$Source, [string]$Destination, [int]$MaxRetries = 3)

    $attempt = 0
    while ($attempt -lt $MaxRetries) {
        $attempt++
        try {
            Copy-Item -Path $Source -Destination $Destination -ErrorAction Stop
            return
        }
        catch [System.IO.IOException] {
            Write-Warning "IO error: $_"
            Start-Sleep -Seconds 2
        }
        catch {
            Write-Error "Unexpected error: $_"
            throw
        }
    }
    throw "Failed after $MaxRetries attempts"
}
```

### Error Action Preference

```powershell
# Global preference
$ErrorActionPreference = "Stop"  # Stop, Continue, SilentlyContinue

# Per-cmdlet
Get-Service -Name "NonExistent" -ErrorAction SilentlyContinue

# Check results
$?  # $true if last command succeeded
$LASTEXITCODE  # Exit code of last external command
$Error[0]  # Most recent error

# Common patterns
if (Get-Command "az" -ErrorAction SilentlyContinue) {
    Write-Host "Azure CLI is installed"
}

if (Test-Path "config.json") {
    $config = Get-Content "config.json" | ConvertFrom-Json
}
```

## Parameters and Validation

```powershell
function New-UserAccount {
    [CmdletBinding(SupportsShouldProcess=$true)]
    param(
        [Parameter(Mandatory=$true)]
        [string]$Username,

        [ValidateSet('Admin', 'User', 'Guest')]
        [string]$Role,

        [ValidatePattern('^[\w\.-]+@[\w\.-]+\.\w+$')]
        [string]$Email,

        [ValidateRange(1, 365)]
        [int]$PasswordExpiryDays = 90,

        [ValidateLength(1, 50)]
        [string]$Description,

        [switch]$Force
    )

    if ($PSCmdlet.ShouldProcess($Username, "Create user")) {
        Write-Host "Creating user: $Username with role: $Role"
    }
}

# Usage
New-UserAccount -Username "jdoe" -Role "User" -WhatIf
```

## Modules

### Creating a Module

```powershell
# MyTools.psm1
function Get-SystemInfo {
    [PSCustomObject]@{
        ComputerName = $env:COMPUTERNAME
        OS = (Get-CimInstance Win32_OperatingSystem).Caption
        MemoryGB = [math]::Round((Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory/1GB, 2)
    }
}

function Test-Port {
    param([string]$ComputerName, [int]$Port)
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $tcp.Connect($ComputerName, $Port)
        $tcp.Close()
        return $true
    }
    catch { return $false }
}

Export-ModuleMember -Function Get-SystemInfo, Test-Port
```

### Using Modules

```powershell
# Import and manage
Import-Module -Name "MyTools"
Get-Module -ListAvailable
Get-Module
Remove-Module -Name "MyTools"

# PowerShell Gallery
Install-Module -Name "Posh-SSH" -Scope CurrentUser
Find-Module -Name "*Azure*"
Update-Module -Name "Posh-SSH"
```

## Remote Management

### PowerShell Remoting

```powershell
# Enable remoting
Enable-PSRemoting -Force

# Run command remotely
Invoke-Command -ComputerName "server01" -ScriptBlock { Get-Service -Name "WinRM" }
Invoke-Command -ComputerName "server01", "server02" -ScriptBlock { Get-EventLog -LogName System -Newest 10 }

# With credentials and arguments
$cred = Get-Credential
Invoke-Command -ComputerName "server01" -Credential $cred -ArgumentList "WinRM" -ScriptBlock {
    param($ServiceName)
    Get-Service -Name $ServiceName
}

# Persistent sessions
$session = New-PSSession -ComputerName "server01"
Invoke-Command -Session $session -ScriptBlock { Get-Process | Export-Csv "C:\temp\processes.csv" }
Copy-Item -Path ".\config.json" -Destination "C:\app\" -ToSession $session
Remove-PSSession -Session $session
```

## Desired State Configuration (DSC)

```powershell
Configuration WebServerConfig {
    param([string[]]$ComputerName = "localhost")

    Import-DscResource -ModuleName PSDesiredStateConfiguration

    Node $ComputerName {
        WindowsFeature IIS {
            Ensure = "Present"
            Name = "Web-Server"
        }

        File WebsiteContent {
            Ensure = "Present"
            Type = "Directory"
            DestinationPath = "C:\inetpub\wwwroot\mysite"
            DependsOn = "[WindowsFeature]IIS"
        }

        Service W3SVC {
            Name = "W3SVC"
            State = "Running"
            StartupType = "Automatic"
            DependsOn = "[WindowsFeature]IIS"
        }
    }
}

# Generate and apply
WebServerConfig -ComputerName "web01" -OutputPath "C:\DSC\Configs"
Start-DscConfiguration -Path "C:\DSC\Configs" -Wait -Verbose
Test-DscConfiguration
```

## Common Cmdlets

### Get, Set, New, Remove

```powershell
# Files
Get-ChildItem -Path "C:\Logs" -Recurse -Filter "*.log"
Get-Content -Path "app.log" -Tail 50

# Services and processes
Get-Service | Where-Object {$_.Status -eq "Running"}
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10

# System
Get-ComputerInfo
Get-CimInstance Win32_OperatingSystem
Get-EventLog -LogName Application -Newest 100

# Network
Get-NetAdapter
Get-NetIPAddress
Get-NetTCPConnection -State Established

# Set (modify)
Set-Service -Name "Spooler" -StartupType Automatic
Set-Content -Path "config.txt" -Value "Setting=Value"

# New (create)
New-Item -Path "C:\Temp\NewFolder" -ItemType Directory
New-LocalUser -Name "AppUser" -Password (ConvertTo-SecureString "P@ss" -AsPlainText -Force)

# Remove (delete)
Remove-Item -Path "C:\Temp\OldFiles" -Recurse -Force
Remove-LocalUser -Name "TempUser"
```

## Testing with Pester

```powershell
# Install Pester
Install-Module -Name Pester -Force -SkipPublisherCheck

# Test file
BeforeAll { . "$PSScriptRoot\MyFunctions.ps1" }

Describe "Get-DiskInfo" {
    It "Returns disk information" {
        $result = Get-DiskInfo
        $result | Should -Not -BeNullOrEmpty
        $result.PSObject.Properties.Name | Should -Contain "Drive"
    }
}

Describe "Test-ServiceRunning" {
    It "Handles stopped services" {
        Mock Get-Service { [PSCustomObject]@{ Status = "Stopped" } }
        Test-ServiceRunning -Name "Test" | Should -Be $false
    }
}

Invoke-Pester -Path ".\MyFunctions.Tests.ps1"
```

## Best Practices

1. **Use Approved Verbs**: `Get-Verb` lists approved verbs (Good: Get-UserInfo, Bad: Fetch-UserInfo)

2. **Implement -WhatIf and -Confirm**:
```powershell
function Remove-OldLogs {
    [CmdletBinding(SupportsShouldProcess=$true)]
    param([int]$DaysOld = 30)
    $files = Get-ChildItem -Path "C:\Logs" -Filter "*.log" |
        Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-$DaysOld)}
    foreach ($file in $files) {
        if ($PSCmdlet.ShouldProcess($file.Name, "Delete")) { Remove-Item $file.FullName }
    }
}
Remove-OldLogs -WhatIf
```

3. **Always Handle Errors**: Use try-catch with ErrorAction Stop

4. **Use CmdletBinding**: Enables -Verbose, -Debug, -ErrorAction, -WarningAction parameters

## PowerShell vs Bash for Linux Admins

```powershell
# List files: ls/dir -> Get-ChildItem
# Find files: find / -name "*.log" -> Get-ChildItem -Path / -Recurse -Filter "*.log"
# Search: grep "error" file.log -> Select-String -Pattern "error" -Path file.log
# Processes: ps aux -> Get-Process | kill -9 PID -> Stop-Process -Id PID -Force
# Pipes: ps aux | grep firefox -> Get-Process | Where-Object {$_.Name -like "*firefox*"}
# Variables: var="value" -> $var = "value"
# Conditionals: if [ $x -eq 5 ] -> if ($x -eq 5) {}
# Operators: -eq, -ne, -gt, -lt, -like, -match (same concept, different syntax)
```

## Real-World Example: System Health Check

```powershell
function Get-SystemHealth {
    param([string]$ComputerName = $env:COMPUTERNAME)

    $health = @{ ComputerName = $ComputerName; Status = "Healthy"; Issues = @() }

    # Check disk space
    Get-PSDrive -PSProvider FileSystem | Where-Object {$_.Free} | ForEach-Object {
        $percentFree = ($_.Free / ($_.Used + $_.Free)) * 100
        if ($percentFree -lt 10) {
            $health.Issues += "Disk $($_.Name): Low space"
            $health.Status = "Warning"
        }
    }

    # Check critical services
    @("WinRM", "W32Time", "Dnscache") | ForEach-Object {
        $service = Get-Service -Name $_ -ErrorAction SilentlyContinue
        if ($service.Status -ne "Running") {
            $health.Issues += "Service $_ is $($service.Status)"
            $health.Status = "Critical"
        }
    }

    # Check memory
    $os = Get-CimInstance Win32_OperatingSystem
    $memUsed = (($os.TotalVisibleMemorySize - $os.FreePhysicalMemory) / $os.TotalVisibleMemorySize) * 100
    if ($memUsed -gt 90) {
        $health.Issues += "High memory: $([math]::Round($memUsed,1))%"
        $health.Status = "Warning"
    }

    return [PSCustomObject]$health
}

# Usage
$result = Get-SystemHealth
$result | ConvertTo-Json | Out-File "health-report.json"

if ($result.Status -ne "Healthy") {
    Send-MailMessage -To "admin@example.com" `
        -Subject "System Alert: $($result.ComputerName)" `
        -Body ($result.Issues -join "`n")
}
```

## Additional Real-World Examples

### Automated Backup

```powershell
function Start-Backup {
    param([string]$Source, [string]$Destination, [int]$RetentionDays = 7)

    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backupPath = Join-Path $Destination "Backup_$timestamp"

    Copy-Item -Path $Source -Destination $backupPath -Recurse -ErrorAction Stop

    # Cleanup old backups
    Get-ChildItem -Path $Destination -Directory |
        Where-Object {$_.CreationTime -lt (Get-Date).AddDays(-$RetentionDays)} |
        Remove-Item -Recurse -Force
}
```

### Log Analysis

```powershell
function Get-ErrorsFromLog {
    param([string]$LogPath, [int]$Hours = 24)

    $since = (Get-Date).AddHours(-$Hours)
    Get-Content $LogPath |
        Select-String -Pattern "ERROR|FATAL" |
        ForEach-Object {
            if ($_.Line -match '(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})') {
                if ([datetime]$matches[1] -gt $since) {
                    [PSCustomObject]@{ Timestamp = [datetime]$matches[1]; Message = $_.Line }
                }
            }
        } | Sort-Object Timestamp
}
```

This guide provides production-ready PowerShell patterns for system administration and automation.
