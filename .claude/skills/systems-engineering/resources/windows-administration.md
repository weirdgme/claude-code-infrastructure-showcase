# Windows Administration

Comprehensive guide to Windows Server administration covering Active Directory, Group Policy, Windows services, IIS, WSUS, security hardening, and operational management.

## Windows Server Architecture

### Server Roles and Features

```
┌─────────────────────────────────────────────────────────────┐
│                   Windows Server Roles                      │
├─────────────────────────────────────────────────────────────┤
│ Active Directory Domain Services (AD DS)                    │
│ DNS Server                                                   │
│ DHCP Server                                                  │
│ File and Storage Services                                   │
│ Web Server (IIS)                                            │
│ Hyper-V                                                     │
│ Remote Desktop Services                                     │
│ Windows Server Update Services (WSUS)                      │
└─────────────────────────────────────────────────────────────┘
```

**Installing Roles with PowerShell:**
```powershell
# Install AD Domain Services
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Install DNS Server
Install-WindowsFeature -Name DNS -IncludeManagementTools

# Install IIS with common features
Install-WindowsFeature -Name Web-Server -IncludeAllSubFeature -IncludeManagementTools

# Install WSUS
Install-WindowsFeature -Name UpdateServices -IncludeManagementTools

# List all available roles and features
Get-WindowsFeature

# Remove a role
Uninstall-WindowsFeature -Name Web-Server -Remove
```

## Active Directory Domain Services

### Domain Controller Setup

**Promote Server to Domain Controller:**
```powershell
# Install AD DS role first
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Create new forest
$domainName = "company.local"
$netbiosName = "COMPANY"
$safeModePwd = ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force

Install-ADDSForest `
    -DomainName $domainName `
    -DomainNetbiosName $netbiosName `
    -ForestMode "WinThreshold" `
    -DomainMode "WinThreshold" `
    -InstallDns `
    -SafeModeAdministratorPassword $safeModePwd `
    -Force

# Add additional domain controller to existing domain
$credential = Get-Credential "COMPANY\Administrator"

Install-ADDSDomainController `
    -DomainName "company.local" `
    -Credential $credential `
    -InstallDns `
    -SafeModeAdministratorPassword $safeModePwd `
    -Force
```

### Active Directory User Management

**Creating and Managing Users:**
```powershell
# Import AD module
Import-Module ActiveDirectory

# Create new user
New-ADUser `
    -Name "John Smith" `
    -GivenName "John" `
    -Surname "Smith" `
    -SamAccountName "jsmith" `
    -UserPrincipalName "jsmith@company.local" `
    -Path "OU=Users,OU=IT,DC=company,DC=local" `
    -AccountPassword (ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force) `
    -Enabled $true `
    -ChangePasswordAtLogon $true `
    -Description "IT Administrator" `
    -Department "IT" `
    -Title "System Administrator"

# Bulk user creation from CSV
$users = Import-Csv "C:\users.csv"
foreach ($user in $users) {
    New-ADUser `
        -Name "$($user.FirstName) $($user.LastName)" `
        -GivenName $user.FirstName `
        -Surname $user.LastName `
        -SamAccountName $user.Username `
        -UserPrincipalName "$($user.Username)@company.local" `
        -Path $user.OU `
        -AccountPassword (ConvertTo-SecureString $user.Password -AsPlainText -Force) `
        -Enabled $true `
        -Department $user.Department
}

# Modify user properties
Set-ADUser -Identity "jsmith" -Title "Senior System Administrator" -Department "IT"

# Disable user account
Disable-ADAccount -Identity "jsmith"

# Enable user account
Enable-ADAccount -Identity "jsmith"

# Reset password
Set-ADAccountPassword -Identity "jsmith" -Reset -NewPassword (ConvertTo-SecureString "NewP@ssw0rd!" -AsPlainText -Force)

# Find inactive users (not logged in for 90 days)
$inactiveDays = 90
$cutoffDate = (Get-Date).AddDays(-$inactiveDays)
Search-ADAccount -UsersOnly -AccountInactive -TimeSpan $inactiveDays |
    Select-Object Name, SamAccountName, LastLogonDate

# Find locked accounts
Search-ADAccount -LockedOut | Select-Object Name, SamAccountName, LockedOut

# Unlock account
Unlock-ADAccount -Identity "jsmith"
```

### Organizational Units (OUs) and Groups

**OU Management:**
```powershell
# Create OU structure
New-ADOrganizationalUnit -Name "IT" -Path "DC=company,DC=local"
New-ADOrganizationalUnit -Name "Users" -Path "OU=IT,DC=company,DC=local"
New-ADOrganizationalUnit -Name "Computers" -Path "OU=IT,DC=company,DC=local"

# Move user to different OU
Move-ADObject -Identity "CN=John Smith,OU=Users,DC=company,DC=local" `
    -TargetPath "OU=Users,OU=IT,DC=company,DC=local"

# Delete OU (must be empty or use -Recursive)
Remove-ADOrganizationalUnit -Identity "OU=OldOU,DC=company,DC=local" -Recursive -Confirm:$false
```

**Group Management:**
```powershell
# Create security group
New-ADGroup `
    -Name "IT-Administrators" `
    -SamAccountName "IT-Admins" `
    -GroupCategory Security `
    -GroupScope Global `
    -Path "OU=Groups,OU=IT,DC=company,DC=local" `
    -Description "IT Department Administrators"

# Add user to group
Add-ADGroupMember -Identity "IT-Administrators" -Members "jsmith"

# Add multiple users
Add-ADGroupMember -Identity "IT-Administrators" -Members @("jsmith", "jdoe", "aadams")

# Remove user from group
Remove-ADGroupMember -Identity "IT-Administrators" -Members "jsmith" -Confirm:$false

# List group members
Get-ADGroupMember -Identity "IT-Administrators" | Select-Object Name, SamAccountName

# List groups user belongs to
Get-ADPrincipalGroupMembership -Identity "jsmith" | Select-Object Name
```

## Group Policy (GPO)

### Creating and Managing GPOs

**PowerShell GPO Management:**
```powershell
# Import Group Policy module
Import-Module GroupPolicy

# Create new GPO
New-GPO -Name "Security-Baseline" -Comment "Corporate security baseline settings"

# Link GPO to OU
New-GPLink -Name "Security-Baseline" -Target "OU=IT,DC=company,DC=local" -LinkEnabled Yes

# Set GPO registry value (example: disable guest account)
Set-GPRegistryValue -Name "Security-Baseline" `
    -Key "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon" `
    -ValueName "AutoAdminLogon" `
    -Type String `
    -Value "0"

# Backup GPO
Backup-GPO -Name "Security-Baseline" -Path "C:\GPO-Backups"

# Backup all GPOs
Backup-GPO -All -Path "C:\GPO-Backups"

# Restore GPO
Restore-GPO -Name "Security-Baseline" -Path "C:\GPO-Backups"

# Generate GPO report
Get-GPOReport -Name "Security-Baseline" -ReportType Html -Path "C:\Reports\SecurityBaseline.html"

# List all GPOs
Get-GPO -All | Select-Object DisplayName, GpoStatus, CreationTime

# Force Group Policy update on client
gpupdate /force

# Force Group Policy update remotely
Invoke-Command -ComputerName "WS01" -ScriptBlock { gpupdate /force }
```

### Common GPO Settings

**Security Policies via GPO:**
```powershell
# Password Policy (via Set-ADDefaultDomainPasswordPolicy)
Set-ADDefaultDomainPasswordPolicy -Identity "company.local" `
    -MinPasswordLength 14 `
    -PasswordHistoryCount 24 `
    -MaxPasswordAge (New-TimeSpan -Days 90) `
    -MinPasswordAge (New-TimeSpan -Days 1) `
    -ComplexityEnabled $true `
    -LockoutDuration (New-TimeSpan -Minutes 30) `
    -LockoutThreshold 5 `
    -LockoutObservationWindow (New-TimeSpan -Minutes 30)

# Account Lockout Policy via LGPO
# Note: Complex GPO settings typically done via GUI or LGPO tool
# Example: Deploy Security Template
secedit /configure /db secedit.sdb /cfg "C:\SecurityTemplates\baseline.inf"
```

## Windows Services

### Service Management

**Managing Services with PowerShell:**
```powershell
# List all services
Get-Service | Select-Object Name, DisplayName, Status, StartType

# Get specific service
Get-Service -Name "W3SVC"  # IIS

# Start service
Start-Service -Name "W3SVC"

# Stop service
Stop-Service -Name "W3SVC"

# Restart service
Restart-Service -Name "W3SVC"

# Set service startup type
Set-Service -Name "W3SVC" -StartupType Automatic

# Create new service (example: run PowerShell script as service)
New-Service -Name "CustomMonitor" `
    -BinaryPathName "C:\Scripts\monitor.exe" `
    -DisplayName "Custom Monitoring Service" `
    -Description "Monitors system resources" `
    -StartupType Automatic

# Delete service
Remove-Service -Name "CustomMonitor"  # PowerShell 6+
# For PowerShell 5.1 and earlier:
sc.exe delete "CustomMonitor"

# Get service dependencies
Get-Service -Name "W3SVC" -DependentServices
Get-Service -Name "W3SVC" -RequiredServices

# Filter running services
Get-Service | Where-Object { $_.Status -eq "Running" }

# Monitor service and restart if stopped
$serviceName = "W3SVC"
$service = Get-Service -Name $serviceName
if ($service.Status -ne "Running") {
    Start-Service -Name $serviceName
    Write-Host "Service $serviceName was stopped and has been restarted"
}
```

### Creating Windows Service with NSSM

**NSSM (Non-Sucking Service Manager):**
```powershell
# Download and install NSSM
# Example: Install PowerShell script as service

# Install service using NSSM
nssm install MyAppService "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" `
    "-ExecutionPolicy Bypass -NoProfile -File C:\Scripts\MyApp.ps1"

# Set service description
nssm set MyAppService Description "My Application Service"

# Set service startup directory
nssm set MyAppService AppDirectory "C:\Scripts"

# Set service log file
nssm set MyAppService AppStdout "C:\Logs\MyApp-output.log"
nssm set MyAppService AppStderr "C:\Logs\MyApp-error.log"

# Set service restart behavior
nssm set MyAppService AppExit Default Restart

# Start service
nssm start MyAppService

# Remove service
nssm remove MyAppService confirm
```

## Windows Registry

### Registry Operations

**PowerShell Registry Management:**
```powershell
# Registry is accessed like filesystem with PSDrive

# Read registry value
Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion" -Name "ProgramFilesDir"

# Set registry value
Set-ItemProperty -Path "HKLM:\SOFTWARE\MyApp" -Name "ConfigPath" -Value "C:\Config"

# Create new registry key
New-Item -Path "HKLM:\SOFTWARE\MyCompany"

# Create registry value
New-ItemProperty -Path "HKLM:\SOFTWARE\MyCompany" -Name "Version" -Value "1.0" -PropertyType String

# Delete registry key
Remove-Item -Path "HKLM:\SOFTWARE\MyCompany" -Recurse

# Delete registry value
Remove-ItemProperty -Path "HKLM:\SOFTWARE\MyCompany" -Name "Version"

# Check if registry key exists
Test-Path "HKLM:\SOFTWARE\MyCompany"

# Backup registry key
reg export "HKLM\SOFTWARE\MyCompany" "C:\Backups\MyCompany.reg"

# Restore registry key
reg import "C:\Backups\MyCompany.reg"

# Remote registry operations
$computer = "Server01"
Invoke-Command -ComputerName $computer -ScriptBlock {
    Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion" -Name "ProgramFilesDir"
}
```

## IIS Web Server

### IIS Management

**IIS PowerShell Administration:**
```powershell
# Import IIS module
Import-Module WebAdministration

# List all websites
Get-Website | Select-Object Name, State, PhysicalPath, Bindings

# Create new website
New-Website -Name "MyWebsite" `
    -Port 80 `
    -PhysicalPath "C:\inetpub\wwwroot\mysite" `
    -ApplicationPool "DefaultAppPool"

# Create website with HTTPS binding
New-Website -Name "SecureWebsite" `
    -Port 443 `
    -PhysicalPath "C:\inetpub\wwwroot\securesite" `
    -Ssl `
    -ApplicationPool "DefaultAppPool"

# Add website binding
New-WebBinding -Name "MyWebsite" -IPAddress "*" -Port 8080 -Protocol http

# Start/Stop website
Start-Website -Name "MyWebsite"
Stop-Website -Name "MyWebsite"

# Create application pool
New-WebAppPool -Name "MyAppPool"

# Configure application pool
Set-ItemProperty -Path "IIS:\AppPools\MyAppPool" -Name processModel.identityType -Value 4  # ApplicationPoolIdentity
Set-ItemProperty -Path "IIS:\AppPools\MyAppPool" -Name recycling.periodicRestart.time -Value "00:00:00"

# Start/Stop application pool
Start-WebAppPool -Name "MyAppPool"
Stop-WebAppPool -Name "MyAppPool"
Restart-WebAppPool -Name "MyAppPool"

# Create virtual directory
New-WebVirtualDirectory -Site "MyWebsite" -Name "images" -PhysicalPath "C:\images"

# List application pools
Get-IISAppPool | Select-Object Name, Status, ManagedRuntimeVersion

# Get website bindings
Get-WebBinding -Name "MyWebsite"

# Remove website
Remove-Website -Name "MyWebsite"
```

### IIS SSL Certificate Management

**SSL Certificate Operations:**
```powershell
# Import certificate to certificate store
$certPassword = ConvertTo-SecureString -String "P@ssw0rd" -Force -AsPlainText
Import-PfxCertificate -FilePath "C:\Certificates\mycert.pfx" `
    -CertStoreLocation Cert:\LocalMachine\My `
    -Password $certPassword

# List certificates
Get-ChildItem -Path Cert:\LocalMachine\My | Select-Object Thumbprint, Subject, NotAfter

# Bind SSL certificate to website
$cert = Get-ChildItem -Path Cert:\LocalMachine\My | Where-Object { $_.Subject -like "*mysite.com*" }
New-WebBinding -Name "MyWebsite" -IPAddress "*" -Port 443 -Protocol https
$binding = Get-WebBinding -Name "MyWebsite" -Protocol https
$binding.AddSslCertificate($cert.Thumbprint, "my")

# Remove certificate binding
Remove-Item -Path "IIS:\SslBindings\0.0.0.0!443"
```

## WSUS (Windows Server Update Services)

### WSUS Configuration

**PowerShell WSUS Management:**
```powershell
# Load WSUS assembly
[reflection.assembly]::LoadWithPartialName("Microsoft.UpdateServices.Administration") | Out-Null

# Connect to WSUS server
$wsus = [Microsoft.UpdateServices.Administration.AdminProxy]::GetUpdateServer("WSUSServer", $false, 8530)

# Get WSUS configuration
$wsusConfig = $wsus.GetConfiguration()
$wsusConfig.SyncFromMicrosoftUpdate = $true
$wsusConfig.Save()

# Get subscription and sync
$subscription = $wsus.GetSubscription()
$subscription.StartSynchronization()

# Check sync status
$subscription.GetSynchronizationStatus()

# Get update categories
$wsus.GetUpdateCategories() | Select-Object Title, Type

# Approve updates for specific group
$targetGroup = $wsus.GetComputerTargetGroups() | Where-Object { $_.Name -eq "Production Servers" }
$updates = $wsus.GetUpdates() | Where-Object { $_.IsApproved -eq $false -and $_.IsSuperseded -eq $false }

foreach ($update in $updates) {
    $update.Approve("Install", $targetGroup)
}

# Get computer targets
$wsus.GetComputerTargets() | Select-Object FullDomainName, LastReportedStatusTime, LastSyncTime

# Decline superseded updates
$wsus.GetUpdates() | Where-Object { $_.IsSuperseded -eq $true } | ForEach-Object {
    $_.Decline()
}
```

## Windows Security Hardening

### Security Baseline

**Security Configuration Script:**
```powershell
# Disable unnecessary services
$servicesToDisable = @(
    "RemoteRegistry",
    "RemoteAccess",
    "HomeGroupListener",
    "HomeGroupProvider"
)

foreach ($service in $servicesToDisable) {
    if (Get-Service -Name $service -ErrorAction SilentlyContinue) {
        Stop-Service -Name $service -Force
        Set-Service -Name $service -StartupType Disabled
    }
}

# Configure Windows Firewall
Set-NetFirewallProfile -Profile Domain, Public, Private -Enabled True

# Disable SMBv1
Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force

# Enable Windows Defender real-time protection
Set-MpPreference -DisableRealtimeMonitoring $false

# Configure UAC (User Account Control)
Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" `
    -Name "EnableLUA" -Value 1
Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" `
    -Name "ConsentPromptBehaviorAdmin" -Value 2  # Prompt for consent

# Disable guest account
Disable-LocalUser -Name "Guest"

# Configure audit policy
auditpol /set /subcategory:"Logon" /success:enable /failure:enable
auditpol /set /subcategory:"Account Lockout" /success:enable /failure:enable
auditpol /set /subcategory:"User Account Management" /success:enable /failure:enable
```

## Windows Event Logs

### Event Log Management

**PowerShell Event Log Operations:**
```powershell
# Get event logs
Get-EventLog -List

# Get recent system errors
Get-EventLog -LogName System -EntryType Error -Newest 50

# Get security events (logon failures)
Get-EventLog -LogName Security -InstanceId 4625 -Newest 100

# Filter by time range
Get-EventLog -LogName System -After (Get-Date).AddDays(-1) -Before (Get-Date)

# Using Get-WinEvent (more powerful, supports newer logs)
Get-WinEvent -LogName Application -MaxEvents 100

# Query with FilterHashTable
Get-WinEvent -FilterHashtable @{
    LogName = 'Security'
    ID = 4624  # Successful logon
    StartTime = (Get-Date).AddDays(-7)
}

# Query with XPath
Get-WinEvent -LogName Security -FilterXPath "*[System[EventID=4625]]"

# Export events to CSV
Get-EventLog -LogName System -Newest 1000 |
    Export-Csv -Path "C:\Logs\SystemEvents.csv" -NoTypeInformation

# Clear event log
Clear-EventLog -LogName Application

# Configure log size and retention
Limit-EventLog -LogName Application -MaximumSize 512MB -OverflowAction OverwriteAsNeeded

# Monitor event log in real-time
Get-EventLog -LogName System -Newest 10 -AsBaseObject |
    Select-Object TimeGenerated, EntryType, Source, Message
```

## Remote Desktop and WinRM

### Remote Management

**WinRM Configuration:**
```powershell
# Enable WinRM
Enable-PSRemoting -Force

# Configure TrustedHosts (for non-domain environments)
Set-Item WSMan:\localhost\Client\TrustedHosts -Value "Server01,Server02" -Force

# Test WinRM connectivity
Test-WSMan -ComputerName "Server01"

# Remote command execution
Invoke-Command -ComputerName "Server01" -ScriptBlock {
    Get-Service -Name "W3SVC"
}

# Remote command with credentials
$cred = Get-Credential
Invoke-Command -ComputerName "Server01" -Credential $cred -ScriptBlock {
    Get-Process
}

# Interactive remote session
Enter-PSSession -ComputerName "Server01"

# Run command on multiple computers
Invoke-Command -ComputerName "Server01", "Server02", "Server03" -ScriptBlock {
    Get-EventLog -LogName System -Newest 10
}

# Copy files to remote computer
$session = New-PSSession -ComputerName "Server01"
Copy-Item -Path "C:\Scripts\script.ps1" -Destination "C:\Scripts\" -ToSession $session
Remove-PSSession $session
```

**Remote Desktop Configuration:**
```powershell
# Enable Remote Desktop
Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server" `
    -Name "fDenyTSConnections" -Value 0

# Enable Network Level Authentication
Set-ItemProperty -Path "HKLM:\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" `
    -Name "UserAuthentication" -Value 1

# Configure firewall for RDP
Enable-NetFirewallRule -DisplayGroup "Remote Desktop"

# Get RDP sessions
qwinsta

# Disconnect RDP session
logoff <session-id>
```

## Windows Clustering and Failover

### Failover Clustering

**Cluster Management:**
```powershell
# Install Failover Clustering feature
Install-WindowsFeature -Name Failover-Clustering -IncludeManagementTools

# Test cluster configuration
Test-Cluster -Node "Node1", "Node2"

# Create new cluster
New-Cluster -Name "MyCluster" -Node "Node1", "Node2" -StaticAddress "192.168.1.100"

# Add node to cluster
Add-ClusterNode -Name "Node3" -Cluster "MyCluster"

# Remove node from cluster
Remove-ClusterNode -Name "Node3" -Cluster "MyCluster"

# Get cluster resources
Get-ClusterResource

# Get cluster status
Get-Cluster | Select-Object Name, Domain, QuorumType

# Create clustered role (example: file server)
Add-ClusterFileServerRole -Name "FileServer01" -Storage "Cluster Disk 1" -StaticAddress "192.168.1.101"

# Move cluster group to different node
Move-ClusterGroup -Name "FileServer01" -Node "Node2"

# Get cluster events
Get-ClusterLog -Destination "C:\Logs"
```

## Best Practices

### Windows Administration Best Practices

1. **Security:**
   - Implement least privilege access (RBAC)
   - Regular security updates via WSUS
   - Enable BitLocker on sensitive servers
   - Use strong password policies
   - Enable audit logging
   - Disable unnecessary services and protocols

2. **Active Directory:**
   - Regular AD backups (System State)
   - Multiple domain controllers for redundancy
   - Proper OU structure for GPO application
   - Regular AD health checks (dcdiag, repadmin)
   - Implement fine-grained password policies

3. **Monitoring:**
   - Configure event log forwarding
   - Monitor critical services
   - Track failed login attempts
   - Monitor disk space and performance
   - Set up alerts for critical events

4. **Automation:**
   - Use PowerShell for repetitive tasks
   - Document all scripts and procedures
   - Implement scheduled tasks for maintenance
   - Use configuration management tools
   - Version control for scripts

5. **Backup and Recovery:**
   - Regular system state backups
   - Test restore procedures
   - Document recovery procedures
   - Offsite backup storage
   - Verify backup integrity

## Anti-Patterns to Avoid

❌ **Using GUI for repetitive tasks** - Automate with PowerShell
❌ **Running everything as Domain Admin** - Use least privilege
❌ **No GPO testing** - Test in development OU first
❌ **Ignoring Windows updates** - Security vulnerabilities
❌ **Single domain controller** - No redundancy
❌ **Default administrator account enabled** - Security risk
❌ **No audit logging** - Cannot track security events
❌ **Complex OU structure** - Hard to manage GPOs
❌ **No documentation** - Tribal knowledge
❌ **Direct registry edits in production** - Use GPO when possible
