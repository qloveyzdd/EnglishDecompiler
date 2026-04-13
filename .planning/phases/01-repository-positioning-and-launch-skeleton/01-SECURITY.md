---
phase: 01
slug: repository-positioning-and-launch-skeleton
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-13
---

# Phase 01 - Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| Repository landing files -> public GitHub viewers | Public entry files must describe the project accurately and link only to valid repo-owned surfaces. | Positioning copy, quick-start commands, example structure, navigation links |
| Public roadmap -> future contributors | Public roadmap must expose metadata and phase direction without misleading or broken references. | Phase names, launch metadata, contribution direction |
| Repo-owned contribution files -> outside contributors | Contribution and reporting guidance should stay inside repo-owned files and approved GitHub flows. | License terms, contribution rules, conduct expectations, reporting paths |
| GitHub issue templates -> incoming community reports | Intake templates should collect enough structured context to support triage. | Bug details, parser failure examples, environment notes |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-01-01 | Tampering | README.md and ROADMAP.md | mitigate | Top-level repo links now resolve to tracked files. [README.md:10](/E:/EnglishDecompiler/README.md:10) points to [hero.gif](/E:/EnglishDecompiler/assets/hero.gif), which now exists in the repository. | closed |
| T-01-02 | Spoofing | Public project positioning | mitigate | Positioning is explicitly white-box and explicitly not a translator or English-learning tool in [README.md:3](/E:/EnglishDecompiler/README.md:3), [README.md:5](/E:/EnglishDecompiler/README.md:5), [README.md:7](/E:/EnglishDecompiler/README.md:7), [README.md:59](/E:/EnglishDecompiler/README.md:59), [README.md:68](/E:/EnglishDecompiler/README.md:68), and [ROADMAP.md:27](/E:/EnglishDecompiler/ROADMAP.md:27). | closed |
| T-01-03 | Spoofing | Contribution and reporting guidance | mitigate | Official contribution flow stays in repo-owned files and GitHub-managed templates via [CONTRIBUTING.md:19](/E:/EnglishDecompiler/CONTRIBUTING.md:19), [CONTRIBUTING.md:44](/E:/EnglishDecompiler/CONTRIBUTING.md:44), and [config.yml:1](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/config.yml:1). | closed |
| T-01-04 | Repudiation | Issue intake templates | mitigate | Structured bug and parser-example templates require reproducible fields in [bug_report.md:8](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/bug_report.md:8) and [parser_example.md:8](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/parser_example.md:8). | closed |

*Status: open or closed*
*Disposition: mitigate (implementation required), accept (documented risk), transfer (third-party)*

---

## Accepted Risks Log

No accepted risks.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-13 | 4 | 3 | 1 | Codex inline secure-phase audit |
| 2026-04-13 | 4 | 4 | 0 | Codex follow-up after adding hero.gif |

---

## Findings

- Closed threat `T-01-01`: the previously missing hero media asset now exists at [hero.gif](/E:/EnglishDecompiler/assets/hero.gif), so the README top-level media reference is no longer broken.
- Closed threat `T-01-02`: the public copy consistently states the repo is a white-box parser for technical English and not a translator or English-learning tool.
- Closed threat `T-01-03`: contribution guidance and contact routing stay inside repo-owned files and GitHub issue config.
- Closed threat `T-01-04`: bug and parser-example intake both collect structured evidence suitable for triage.

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-13
