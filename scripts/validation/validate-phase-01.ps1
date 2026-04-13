$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$errors = New-Object System.Collections.Generic.List[string]

function Get-Utf8Content {
    param([string]$Path)
    return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
}

function Assert-PathExists {
    param(
        [string]$Path,
        [string]$Label
    )
    if (Test-Path -LiteralPath $Path) {
        Write-Host "[pass] $Label"
        return
    }
    $errors.Add("Missing required path: $Path")
    Write-Host "[fail] $Label"
}

function Assert-Contains {
    param(
        [string]$Path,
        [string]$Needle,
        [string]$Label
    )
    $content = Get-Utf8Content -Path $Path
    if ($content.Contains($Needle)) {
        Write-Host "[pass] $Label"
        return
    }
    $errors.Add("Missing required text in $Path : $Needle")
    Write-Host "[fail] $Label"
}

$readme = Join-Path $repoRoot 'README.md'
$readmeZh = Join-Path $repoRoot 'README.zh-CN.md'
$roadmap = Join-Path $repoRoot 'ROADMAP.md'
$license = Join-Path $repoRoot 'LICENSE'
$contributing = Join-Path $repoRoot 'CONTRIBUTING.md'
$conduct = Join-Path $repoRoot 'CODE_OF_CONDUCT.md'
$bugTemplate = Join-Path $repoRoot '.github\ISSUE_TEMPLATE\bug_report.md'
$parserTemplate = Join-Path $repoRoot '.github\ISSUE_TEMPLATE\parser_example.md'
$issueConfig = Join-Path $repoRoot '.github\ISSUE_TEMPLATE\config.yml'
$heroGif = Join-Path $repoRoot 'assets\hero.gif'

Assert-PathExists -Path $readme -Label 'README.md exists'
Assert-PathExists -Path $readmeZh -Label 'README.zh-CN.md exists'
Assert-PathExists -Path $roadmap -Label 'ROADMAP.md exists'
Assert-PathExists -Path $license -Label 'LICENSE exists'
Assert-PathExists -Path $contributing -Label 'CONTRIBUTING.md exists'
Assert-PathExists -Path $conduct -Label 'CODE_OF_CONDUCT.md exists'
Assert-PathExists -Path $bugTemplate -Label 'bug_report.md exists'
Assert-PathExists -Path $parserTemplate -Label 'parser_example.md exists'
Assert-PathExists -Path $issueConfig -Label 'config.yml exists'
Assert-PathExists -Path $heroGif -Label 'assets/hero.gif exists'

Assert-Contains -Path $readme -Needle '# English Decompiler' -Label 'README title is present'
Assert-Contains -Path $readme -Needle 'Decompile English technical text into actions, objects, and control flow' -Label 'README positioning line is present'
Assert-Contains -Path $readme -Needle '![Hero demo](./assets/hero.gif)' -Label 'README hero reference is present'
Assert-Contains -Path $readme -Needle './README.zh-CN.md' -Label 'README links Chinese companion'
Assert-Contains -Path $readme -Needle './ROADMAP.md' -Label 'README links public roadmap'
Assert-Contains -Path $readme -Needle './CONTRIBUTING.md' -Label 'README links contributing guide'
Assert-Contains -Path $readme -Needle '## Why this exists' -Label 'README includes why section'
Assert-Contains -Path $readme -Needle '## What it does' -Label 'README includes what section'
Assert-Contains -Path $readme -Needle '## Example' -Label 'README includes example section'
Assert-Contains -Path $readme -Needle '## Start in 30 seconds' -Label 'README includes quick start section'
Assert-Contains -Path $readme -Needle '## Status' -Label 'README includes status section'
Assert-Contains -Path $readme -Needle 'Translation gives you an answer. Parsing gives you control.' -Label 'README includes differentiator line'

Assert-Contains -Path $readmeZh -Needle 'Canonical public README: ./README.md' -Label 'Chinese README points to canonical README'
Assert-Contains -Path $readmeZh -Needle './README.md' -Label 'Chinese README links back to README.md'
Assert-Contains -Path $readmeZh -Needle 'Initialize the model before training.' -Label 'Chinese README includes shared example'

Assert-Contains -Path $roadmap -Needle '# English Decompiler Roadmap' -Label 'Public roadmap title is present'
Assert-Contains -Path $roadmap -Needle 'Repository Positioning and Launch Skeleton' -Label 'Roadmap includes phase 1'
Assert-Contains -Path $roadmap -Needle 'Parser Core v0' -Label 'Roadmap includes phase 2'
Assert-Contains -Path $roadmap -Needle 'Local Demo v0' -Label 'Roadmap includes phase 3'
Assert-Contains -Path $roadmap -Needle 'IR and White-Box Correction Loop' -Label 'Roadmap includes phase 4'
Assert-Contains -Path $roadmap -Needle 'Launch Assets and Feedback Intake' -Label 'Roadmap includes phase 5'
Assert-Contains -Path $roadmap -Needle 'A white-box parser for English technical docs.' -Label 'Roadmap includes About copy'
Assert-Contains -Path $roadmap -Needle 'Parse technical English like code.' -Label 'Roadmap includes tagline'
Assert-Contains -Path $roadmap -Needle 'developer-tools' -Label 'Roadmap includes discoverability topics'
Assert-Contains -Path $roadmap -Needle 'sentence -> structure -> IR' -Label 'Roadmap includes social preview direction'

Assert-Contains -Path $license -Needle 'Apache License' -Label 'License title is present'
Assert-Contains -Path $license -Needle 'Version 2.0, January 2004' -Label 'License version is present'
Assert-Contains -Path $contributing -Needle '# Contributing to English Decompiler' -Label 'Contributing title is present'
Assert-Contains -Path $contributing -Needle '## Ways to Help' -Label 'Contributing includes help section'
Assert-Contains -Path $contributing -Needle '## Before You Open an Issue' -Label 'Contributing includes issue guidance'
Assert-Contains -Path $contributing -Needle '## Parser Examples Wanted' -Label 'Contributing includes parser examples section'
Assert-Contains -Path $contributing -Needle '## Pull Requests' -Label 'Contributing includes PR section'
Assert-Contains -Path $contributing -Needle '## Labels and Triage' -Label 'Contributing includes triage section'
Assert-Contains -Path $contributing -Needle 'parser examples wanted' -Label 'Contributing names parser examples label'
Assert-Contains -Path $contributing -Needle 'good first issue' -Label 'Contributing names starter label'
Assert-Contains -Path $conduct -Needle '# Contributor Covenant Code of Conduct' -Label 'Code of Conduct title is present'
Assert-Contains -Path $conduct -Needle '## Enforcement' -Label 'Code of Conduct includes enforcement section'

Assert-Contains -Path $bugTemplate -Needle 'name: Bug report' -Label 'Bug template name is present'
Assert-Contains -Path $bugTemplate -Needle 'labels: [bug]' -Label 'Bug template label is present'
Assert-Contains -Path $bugTemplate -Needle '## Summary' -Label 'Bug template includes summary section'
Assert-Contains -Path $bugTemplate -Needle '## Steps to reproduce' -Label 'Bug template includes repro section'
Assert-Contains -Path $bugTemplate -Needle '## Expected behavior' -Label 'Bug template includes expected section'
Assert-Contains -Path $bugTemplate -Needle '## Actual behavior' -Label 'Bug template includes actual section'

Assert-Contains -Path $parserTemplate -Needle 'name: Parser example' -Label 'Parser template name is present'
Assert-Contains -Path $parserTemplate -Needle 'labels: [parser examples wanted]' -Label 'Parser template label is present'
Assert-Contains -Path $parserTemplate -Needle '## Source sentence' -Label 'Parser template includes sentence section'
Assert-Contains -Path $parserTemplate -Needle '## Source link or doc context' -Label 'Parser template includes source context section'
Assert-Contains -Path $parserTemplate -Needle '## Expected parse or explanation' -Label 'Parser template includes expected parse section'
Assert-Contains -Path $parserTemplate -Needle '## Actual parse' -Label 'Parser template includes actual parse section'

Assert-Contains -Path $issueConfig -Needle 'blank_issues_enabled: false' -Label 'Issue config disables blank issues'
Assert-Contains -Path $issueConfig -Needle 'https://github.com/qloveyzdd/EnglishDecompiler/blob/main/CONTRIBUTING.md' -Label 'Issue config points to contributing guide'

if ($errors.Count -gt 0) {
    Write-Host ''
    Write-Host 'Phase 01 validation failed:'
    foreach ($errorMessage in $errors) {
        Write-Host " - $errorMessage"
    }
    exit 1
}

Write-Host ''
Write-Host 'Phase 01 validation passed.'
exit 0
