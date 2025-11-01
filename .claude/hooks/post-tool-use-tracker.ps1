# PowerShell Post-tool-use hook that tracks edited files and their repos
# Windows users: Use this instead of post-tool-use-tracker.sh

$ErrorActionPreference = "Stop"

# Read tool information from stdin
$toolInfo = $input | ConvertFrom-Json

# Extract relevant data
$toolName = $toolInfo.tool_name
$filePath = $toolInfo.tool_input.file_path
$sessionId = if ($toolInfo.session_id) { $toolInfo.session_id } else { "default" }

# Skip if not an edit tool or no file path
if ($toolName -notmatch '^(Edit|MultiEdit|Write)$' -or [string]::IsNullOrEmpty($filePath)) {
    exit 0
}

# Skip markdown files
if ($filePath -match '\.(md|markdown)$') {
    exit 0
}

# Create cache directory in project
$cacheDir = Join-Path $env:CLAUDE_PROJECT_DIR ".claude\tsc-cache\$sessionId"
New-Item -ItemType Directory -Force -Path $cacheDir | Out-Null

# Function to detect repo from file path
function Detect-Repo {
    param([string]$file)

    $projectRoot = $env:CLAUDE_PROJECT_DIR
    $relativePath = $file.Replace("$projectRoot\", "").Replace("$projectRoot/", "")

    # Extract first directory component
    $firstDir = $relativePath.Split('\')[0].Split('/')[0]

    switch -Regex ($firstDir) {
        # Frontend variations
        '^(frontend|client|web|app|ui)$' { return $firstDir }

        # Backend variations
        '^(backend|server|api|src|services)$' { return $firstDir }

        # Database
        '^(database|prisma|migrations)$' { return $firstDir }

        # Package/monorepo structure
        '^packages$' {
            $parts = $relativePath.Split('\')[0..1]
            if ($parts.Length -ge 2) {
                return "packages\$($parts[1])"
            }
            return $firstDir
        }

        # Examples directory
        '^examples$' {
            $parts = $relativePath.Split('\')[0..1]
            if ($parts.Length -ge 2) {
                return "examples\$($parts[1])"
            }
            return $firstDir
        }

        default {
            # Check if it's a source file in root
            if ($relativePath -notmatch '[\\/]') {
                return "root"
            }
            return "unknown"
        }
    }
}

# Function to get build command for repo
function Get-BuildCommand {
    param([string]$repo)

    $projectRoot = $env:CLAUDE_PROJECT_DIR
    $repoPath = Join-Path $projectRoot $repo
    $packageJson = Join-Path $repoPath "package.json"

    # Check if package.json exists and has a build script
    if (Test-Path $packageJson) {
        $packageContent = Get-Content $packageJson -Raw
        if ($packageContent -match '"build"') {
            # Detect package manager (prefer pnpm, then npm, then yarn)
            if (Test-Path (Join-Path $repoPath "pnpm-lock.yaml")) {
                return "cd $repoPath && pnpm build"
            } elseif (Test-Path (Join-Path $repoPath "package-lock.json")) {
                return "cd $repoPath && npm run build"
            } elseif (Test-Path (Join-Path $repoPath "yarn.lock")) {
                return "cd $repoPath && yarn build"
            } else {
                return "cd $repoPath && npm run build"
            }
        }
    }

    # Special case for database with Prisma
    if ($repo -match '^(database|.*prisma.*)$') {
        if ((Test-Path (Join-Path $repoPath "schema.prisma")) -or
            (Test-Path (Join-Path $repoPath "prisma\schema.prisma"))) {
            return "cd $repoPath && npx prisma generate"
        }
    }

    return ""
}

# Function to get TSC command for repo
function Get-TscCommand {
    param([string]$repo)

    $projectRoot = $env:CLAUDE_PROJECT_DIR
    $repoPath = Join-Path $projectRoot $repo
    $tsconfig = Join-Path $repoPath "tsconfig.json"

    # Check if tsconfig.json exists
    if (Test-Path $tsconfig) {
        # Check for Vite/React-specific tsconfig
        $tsconfigApp = Join-Path $repoPath "tsconfig.app.json"
        if (Test-Path $tsconfigApp) {
            return "cd $repoPath && npx tsc --project tsconfig.app.json --noEmit"
        } else {
            return "cd $repoPath && npx tsc --noEmit"
        }
    }

    return ""
}

# Detect repo
$repo = Detect-Repo $filePath

# Skip if unknown repo
if ($repo -eq "unknown" -or [string]::IsNullOrEmpty($repo)) {
    exit 0
}

# Log edited file
$timestamp = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
Add-Content -Path (Join-Path $cacheDir "edited-files.log") -Value "${timestamp}:${filePath}:${repo}"

# Update affected repos list
$affectedReposFile = Join-Path $cacheDir "affected-repos.txt"
$existingRepos = if (Test-Path $affectedReposFile) { Get-Content $affectedReposFile } else { @() }
if ($existingRepos -notcontains $repo) {
    Add-Content -Path $affectedReposFile -Value $repo
}

# Store build commands
$commandsTmp = Join-Path $cacheDir "commands.txt.tmp"
$buildCmd = Get-BuildCommand $repo
$tscCmd = Get-TscCommand $repo

if (![string]::IsNullOrEmpty($buildCmd)) {
    Add-Content -Path $commandsTmp -Value "${repo}:build:${buildCmd}"
}

if (![string]::IsNullOrEmpty($tscCmd)) {
    Add-Content -Path $commandsTmp -Value "${repo}:tsc:${tscCmd}"
}

# Remove duplicates from commands
$commandsFile = Join-Path $cacheDir "commands.txt"
if (Test-Path $commandsTmp) {
    Get-Content $commandsTmp | Sort-Object -Unique | Set-Content $commandsFile
    Remove-Item $commandsTmp -Force
}

# Exit cleanly
exit 0
