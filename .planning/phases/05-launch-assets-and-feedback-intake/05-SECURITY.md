---
phase: 05
slug: launch-assets-and-feedback-intake
status: verified
threats_open: 0
asvs_level: 1
created: 2026-04-14
---

# Phase 05 - Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| validated demo state -> launch media | Launch assets must only show behavior already supported by the product | sentence text, token roles, JSON view, IR view, correction state |
| canonical examples -> public expectations | Public examples shape what visitors think the parser can really handle | category, sentence, whyItMatters, launchFit, example IDs |
| repo entry pages -> contributors | README and contribution routes must point only to real assets and real issue flows | asset links, examples link, issue-template links, good-first-issue route |
| validation script -> release readiness | Release checks must be repeatable and fail fast instead of relying on memory | file existence checks, link checks, `pnpm check`, `pnpm test`, `pnpm build` |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-05-01 | Integrity | launch media accuracy | mitigate | The launch corpus is explicitly scoped to single-sentence technical English in [launch-examples.json:2](/E:/EnglishDecompiler/examples/launch-examples.json:2) and [launch-examples.json:3](/E:/EnglishDecompiler/examples/launch-examples.json:3), the hero/screenshot set is tied back to stable example IDs in [asset-manifest.json:2](/E:/EnglishDecompiler/assets/launch/asset-manifest.json:2) and [asset-manifest.json:9](/E:/EnglishDecompiler/assets/launch/asset-manifest.json:9), and manual UAT confirmed the asset pack is coherent and not placeholder media in [05-UAT.md:25](/E:/EnglishDecompiler/.planning/phases/05-launch-assets-and-feedback-intake/05-UAT.md:25) and [05-UAT.md:27](/E:/EnglishDecompiler/.planning/phases/05-launch-assets-and-feedback-intake/05-UAT.md:27). | closed |
| T-05-02 | Availability | public asset paths | mitigate | The public hero path is still referenced from [README.md:10](/E:/EnglishDecompiler/README.md:10), launch assets are surfaced in [README.md:60](/E:/EnglishDecompiler/README.md:60), the manifest preserves canonical filenames in [asset-manifest.json:2](/E:/EnglishDecompiler/assets/launch/asset-manifest.json:2) and [asset-manifest.json:8](/E:/EnglishDecompiler/assets/launch/asset-manifest.json:8), and the validation script hard-fails on missing launch files in [validate-phase-05.ps1:3](/E:/EnglishDecompiler/scripts/validation/validate-phase-05.ps1:3) and [validate-phase-05.ps1:50](/E:/EnglishDecompiler/scripts/validation/validate-phase-05.ps1:50). | closed |
| T-05-03 | Integrity | canonical examples corpus | mitigate | The public corpus is machine-readable and category-scoped in [launch-examples.json:4](/E:/EnglishDecompiler/examples/launch-examples.json:4), [launch-examples.json:7](/E:/EnglishDecompiler/examples/launch-examples.json:7), [launch-examples.json:28](/E:/EnglishDecompiler/examples/launch-examples.json:28), [launch-examples.json:49](/E:/EnglishDecompiler/examples/launch-examples.json:49), and [launch-examples.json:70](/E:/EnglishDecompiler/examples/launch-examples.json:70); README exposes the corpus directly in [README.md:12](/E:/EnglishDecompiler/README.md:12) and [README.md:70](/E:/EnglishDecompiler/README.md:70); parser-example intake explicitly asks whether a new sentence should join that corpus in [parser_example.md:28](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/parser_example.md:28) and [parser_example.md:30](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/parser_example.md:30). | closed |
| T-05-04 | Integrity | launch-facing repo copy | mitigate | The English README keeps the locked white-box positioning and only links to real assets and live GitHub routes in [README.md:3](/E:/EnglishDecompiler/README.md:3), [README.md:12](/E:/EnglishDecompiler/README.md:12), [README.md:60](/E:/EnglishDecompiler/README.md:60), and [README.md:74](/E:/EnglishDecompiler/README.md:74); the Chinese companion mirrors those routes while deferring to the English README as the public primary entry in [README.zh-CN.md:3](/E:/EnglishDecompiler/README.zh-CN.md:3), [README.zh-CN.md:18](/E:/EnglishDecompiler/README.zh-CN.md:18), and [README.zh-CN.md:38](/E:/EnglishDecompiler/README.zh-CN.md:38). | closed |
| T-05-05 | Availability | public feedback routes | mitigate | Contributor guidance exposes `bug`, `parser examples wanted`, and `good first issue` directly in [CONTRIBUTING.md:14](/E:/EnglishDecompiler/CONTRIBUTING.md:14), [CONTRIBUTING.md:21](/E:/EnglishDecompiler/CONTRIBUTING.md:21), and [CONTRIBUTING.md:55](/E:/EnglishDecompiler/CONTRIBUTING.md:55); the parser-example template stays explicit in [parser_example.md:2](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/parser_example.md:2) and [parser_example.md:28](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/parser_example.md:28); the issue landing page exposes the good-first-issue and launch-corpus links in [config.yml:6](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/config.yml:6) and [config.yml:9](/E:/EnglishDecompiler/.github/ISSUE_TEMPLATE/config.yml:9). | closed |
| T-05-06 | Repudiation | launch-package verification | mitigate | The release check is codified in [validate-phase-05.ps1:13](/E:/EnglishDecompiler/scripts/validation/validate-phase-05.ps1:13), [validate-phase-05.ps1:20](/E:/EnglishDecompiler/scripts/validation/validate-phase-05.ps1:20), [validate-phase-05.ps1:56](/E:/EnglishDecompiler/scripts/validation/validate-phase-05.ps1:56), and [validate-phase-05.ps1:64](/E:/EnglishDecompiler/scripts/validation/validate-phase-05.ps1:64); UAT closed all five user-visible launch checks in [05-UAT.md:17](/E:/EnglishDecompiler/.planning/phases/05-launch-assets-and-feedback-intake/05-UAT.md:17), [05-UAT.md:33](/E:/EnglishDecompiler/.planning/phases/05-launch-assets-and-feedback-intake/05-UAT.md:33), and [05-UAT.md:40](/E:/EnglishDecompiler/.planning/phases/05-launch-assets-and-feedback-intake/05-UAT.md:40). | closed |

*Status: open or closed*
*Disposition: mitigate (implementation required), accept (documented risk), transfer (third-party)*

---

## Accepted Risks Log

No accepted risks.

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-04-14 | 6 | 6 | 0 | Codex inline secure-phase audit |

---

## Findings

- `T-05-01` is closed: launch media is anchored to the same single-sentence demo scope documented in the public examples corpus and verified by UAT.
- `T-05-02` is closed: public asset filenames are stable, manifest-backed, and checked by the phase validator before release.
- `T-05-03` is closed: the examples corpus is machine-readable, repo-native, and reinforced by the parser-example intake flow.
- `T-05-04` is closed: launch-facing copy stays inside the previously locked white-box parser positioning and only points to real assets.
- `T-05-05` is closed: contributor feedback remains GitHub-native and exposes the three expected intake routes without inventing a second system.
- `T-05-06` is closed: release readiness is reproducible through one command and backed by a fully passing UAT record.

---

## Sign-Off

- [x] All threats have a disposition (mitigate / accept / transfer)
- [x] Accepted risks documented in Accepted Risks Log
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-04-14
