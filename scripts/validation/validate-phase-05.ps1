$ErrorActionPreference = "Stop"

$requiredFiles = @(
  "assets/hero.gif",
  "assets/social-preview.png",
  "assets/launch/demo-overview.png",
  "assets/launch/correction-loop.png",
  "assets/launch/json-ir-view.png",
  "assets/launch/asset-manifest.json",
  "examples/launch-examples.json"
)

$contentChecks = @(
  @{ Path = "README.md"; Pattern = "./assets/hero.gif" },
  @{ Path = "README.md"; Pattern = "./examples/launch-examples.json" },
  @{ Path = "CONTRIBUTING.md"; Pattern = "good first issue" },
  @{ Path = ".github/ISSUE_TEMPLATE/config.yml"; Pattern = "good first issue" }
)

$commands = @(
  "pnpm check",
  "pnpm test",
  "pnpm build"
)

function Invoke-PnpmCommand {
  param(
    [Parameter(Mandatory = $true)]
    [string]$CommandText
  )

  Write-Host "Running: $CommandText"

  $pnpmExists = Get-Command pnpm -ErrorAction SilentlyContinue
  if ($null -ne $pnpmExists) {
    Invoke-Expression $CommandText
    if ($LASTEXITCODE -ne 0) {
      throw "Command failed: $CommandText"
    }
    return
  }

  $corepackCommand = $CommandText -replace "^pnpm", "corepack pnpm"
  Invoke-Expression $corepackCommand
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed: $corepackCommand"
  }
}

foreach ($file in $requiredFiles) {
  if (!(Test-Path $file)) {
    throw "Missing required file: $file"
  }
}

foreach ($check in $contentChecks) {
  Select-String -Path $check.Path -Pattern ([regex]::Escape($check.Pattern)) | Out-Null
}

foreach ($command in $commands) {
  Invoke-PnpmCommand -CommandText $command
}

Write-Host "Phase 05 validation passed."
