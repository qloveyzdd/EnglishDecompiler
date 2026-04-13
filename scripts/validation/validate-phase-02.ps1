$ErrorActionPreference = "Stop"

$commands = @(
  "pnpm install",
  "pnpm check",
  "pnpm test",
  "pnpm fixtures:parse"
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
    return
  }

  $corepackCommand = $CommandText -replace "^pnpm", "corepack pnpm"
  Invoke-Expression $corepackCommand
}

foreach ($command in $commands) {
  Invoke-PnpmCommand -CommandText $command
}

Write-Host "Phase 02 validation passed."
