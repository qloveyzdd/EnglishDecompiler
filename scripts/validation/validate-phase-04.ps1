$ErrorActionPreference = "Stop"

$commands = @(
  "pnpm install",
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

foreach ($command in $commands) {
  Invoke-PnpmCommand -CommandText $command
}

Write-Host "Phase 04 validation passed."
