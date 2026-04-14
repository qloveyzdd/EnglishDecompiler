$ErrorActionPreference = "Stop"

$requiredFiles = @(
  ".planning/phases/01-repository-positioning-and-launch-skeleton/01-VERIFICATION.md",
  ".planning/phases/02-parser-core-v0/02-VERIFICATION.md",
  ".planning/phases/03-local-demo-v0/03-VERIFICATION.md",
  ".planning/phases/04-ir-and-white-box-correction-loop/04-VERIFICATION.md",
  ".planning/phases/05-launch-assets-and-feedback-intake/05-VERIFICATION.md",
  ".planning/phases/06-milestone-evidence-reconciliation/06-VERIFICATION.md",
  ".planning/REQUIREMENTS.md",
  ".planning/v1.0-MILESTONE-AUDIT.md"
)

$contentChecks = @(
  @{ Path = ".planning/phases/01-repository-positioning-and-launch-skeleton/01-VERIFICATION.md"; Pattern = "status: passed" },
  @{ Path = ".planning/phases/02-parser-core-v0/02-VERIFICATION.md"; Pattern = "status: passed" },
  @{ Path = ".planning/phases/03-local-demo-v0/03-VERIFICATION.md"; Pattern = "status: passed" },
  @{ Path = ".planning/phases/04-ir-and-white-box-correction-loop/04-VERIFICATION.md"; Pattern = "status: passed" },
  @{ Path = ".planning/phases/05-launch-assets-and-feedback-intake/05-VERIFICATION.md"; Pattern = "status: passed" },
  @{ Path = ".planning/phases/06-milestone-evidence-reconciliation/06-VERIFICATION.md"; Pattern = "status: passed" },
  @{ Path = ".planning/REQUIREMENTS.md"; Pattern = "[x] **REPO-01**" },
  @{ Path = ".planning/REQUIREMENTS.md"; Pattern = "[x] **REPO-02**" },
  @{ Path = ".planning/REQUIREMENTS.md"; Pattern = "| REPO-01 | Phase 6 | Complete |" },
  @{ Path = ".planning/REQUIREMENTS.md"; Pattern = "| REPO-02 | Phase 6 | Complete |" },
  @{ Path = ".planning/v1.0-MILESTONE-AUDIT.md"; Pattern = "status: passed" },
  @{ Path = ".planning/v1.0-MILESTONE-AUDIT.md"; Pattern = "requirements: 16/16" }
)

foreach ($file in $requiredFiles) {
  if (!(Test-Path $file)) {
    throw "Missing required file: $file"
  }
}

foreach ($check in $contentChecks) {
  Select-String -Path $check.Path -Pattern ([regex]::Escape($check.Pattern)) | Out-Null
}

Write-Host "Phase 06 validation passed."
