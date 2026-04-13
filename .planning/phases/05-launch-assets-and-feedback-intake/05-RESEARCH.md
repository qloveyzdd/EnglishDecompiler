# Phase 5: Launch Assets and Feedback Intake - Research

**Researched:** 2026-04-14
**Domain:** Repo-native launch packaging for the current MVP
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Phase 5 ships a minimal publishable launch pack, not a broader media campaign.
- The required assets are one polished GIF, two to three screenshots, one social preview image, and one repo-browsable examples set.
- Launch assets must show the real MVP loop: sentence input -> parser output -> token correction -> updated JSON/IR.
- The canonical public example corpus must live in a repo-level `examples/` directory.
- GitHub issues stay the main public feedback path.
- Existing issue-template surfaces should be extended instead of replaced with a new intake mechanism.
- Public feedback should stay centered on `bug`, `parser examples wanted`, and `good first issue`.
- This phase only creates repo-native launch copy; it does not create channel-specific launch drafts.
- Product positioning remains fixed around the white-box parser thesis and must not drift toward generic AI or translation claims.

### the agent's Discretion
- Exact filenames inside `assets/` and `examples/`
- Exact example sentence selection, as long as it stays technical-doc oriented
- Exact wording for launch-facing repo copy
- Exact wording for feedback instructions and label guidance

### Deferred Ideas (OUT OF SCOPE)
- X / Hacker News / Reddit / Chinese-community launch drafts as committed repo files
- Architecture diagrams and a larger media kit
- Parser-scope expansion beyond the current single-sentence MVP
- New feedback systems outside GitHub-native issue flows

</user_constraints>

<research_summary>
## Summary

Phase 5 should treat the repository itself as the release surface. The product already has a validated local demo, a parser contract, a correction loop, and working contribution entry points. The missing layer is packaging: durable launch assets, a canonical public examples corpus, clearer feedback routing, and one obvious validation path that keeps these surfaces from drifting.

The simplest robust approach is to keep everything repo-native. That means:
- static launch assets under `assets/`
- canonical example data under `examples/`
- launch-facing copy in `README.md`, `README.zh-CN.md`, and `CONTRIBUTING.md`
- GitHub-native feedback routing through existing issue templates plus label-aware links
- a PowerShell validation script that checks file existence, link integrity, and the existing app build/test path

This phase does not need a new app framework, deployment surface, screenshot automation pipeline, or external CMS. The demo already exists. The repo already has the public pages. The highest-value work is to capture the validated product honestly and make the feedback loop easy to find.

**Primary recommendation:** Build one canonical launch asset pack and one canonical examples corpus first, then wire those exact files into README and contribution surfaces, and protect the whole package with a file-and-link validation script.
</research_summary>

<standard_stack>
## Standard Stack

The established tools already present in this repo are enough for this phase:

### Core
| Tool / Surface | Purpose | Why It Fits |
|----------------|---------|-------------|
| Existing `Vite + React + TypeScript` demo | Source for screenshots and GIF moments | Phase 4 already validated the exact behaviors launch assets should show |
| Static files in `assets/` | Hero GIF, screenshots, social preview | GitHub renders these directly and keeps the launch package portable |
| Structured files in `examples/` | Canonical public example corpus | Easy to browse, diff, and extend through pull requests |
| Existing GitHub issue templates | Public feedback routing | Already aligned with `bug` and `parser examples wanted` flows |
| PowerShell validation scripts | Repo-native release checks | Consistent with previous phases and the current Windows-first workflow |

### Supporting
| Tool / Surface | Purpose | When to Use |
|----------------|---------|-------------|
| `README.md` | Main English launch entry | Use for the first-screen promise, assets, examples link, and feedback CTA |
| `README.zh-CN.md` | Chinese companion entry | Keep in sync with launch-facing links without replacing the English-first structure |
| `CONTRIBUTING.md` | Feedback and contribution rules | Use to make the issue paths explicit and easy to follow |
| `.github/ISSUE_TEMPLATE/config.yml` | GitHub issue landing configuration | Use to surface `good first issue` and other issue-entry routes |
| `scripts/validation/validate-phase-05.ps1` | One-command release-package validation | Use for file/link checks plus `pnpm check/test/build` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Repo-native assets and examples | External website or docs microsite | More moving parts, weaker portability, unnecessary for MVP launch |
| Existing issue templates + label links | Custom form intake or discussion portal | Harder to maintain, breaks the current GitHub-native contribution flow |
| Static asset pack | Automated screenshot / recording toolchain | Heavier setup for little product value in this phase |

**Key point:** Phase 5 is packaging work. The simplest good solution is to reuse the current validated product and make its public surfaces sharper.
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Pattern 1: Canonical launch assets live beside the product, not outside it
**What:** Keep hero GIF, screenshots, and social preview as committed files under `assets/`.
**When to use:** For every launch asset linked from README or used by repository previews.
**Why:** This keeps the launch package portable, reviewable, and versioned with the repo.

### Pattern 2: Canonical examples are data, not scattered prose
**What:** Store the public examples set in a structured repo directory such as `examples/launch-examples.json`.
**When to use:** For the first release corpus and future parser-example additions.
**Why:** Visitors can inspect examples quickly, and contributors can extend them without scraping README prose.

### Pattern 3: Feedback routing should deepen the existing GitHub path, not replace it
**What:** Keep `bug` and `parser examples wanted` issue templates, and surface `good first issue` through label-aware links and clearer copy.
**When to use:** Across README, CONTRIBUTING, and issue config.
**Why:** The repo already teaches contributors to use GitHub issues; the best move is to reduce ambiguity, not add another system.

### Pattern 4: Validation should combine file checks with the existing app health checks
**What:** Add a phase-specific PowerShell script that verifies the launch files and also re-runs `pnpm check`, `pnpm test`, and `pnpm build`.
**When to use:** After every task commit and before UAT.
**Why:** Launch packaging is mostly files and links, but it still depends on the app being runnable and honest.

### Anti-Patterns to Avoid
- Adding a whole screenshot automation stack just to produce three static assets
- Hiding the canonical examples corpus only inside README text
- Claiming support for multi-sentence parsing or broader AI capabilities in launch copy
- Creating separate submission systems for examples when GitHub issues already exist
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

Problems that look simple but already have a better minimal answer:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Public examples | Narrative examples page only | Structured `examples/` data file | Easier to diff, verify, and reuse |
| Feedback intake | Custom web form or email workflow | Existing GitHub issue templates + links | Already fits the repo's community model |
| Launch validation | Manual eyeballing only | `validate-phase-05.ps1` + manual visual pass | Keeps file/link regressions obvious |
| Release microsite | Separate landing page app | Existing README surfaces | Lower maintenance and faster shipping |
| Screenshot pipeline | Playwright/ffmpeg stack by default | Static committed assets | Enough for an MVP launch pack |

**Key insight:** The release surface is the repository. Keep the packaging inside the repository.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Launch assets over-claim parser capability
**What goes wrong:** The GIF or screenshots imply broader support than the current single-sentence technical-English MVP.
**Why it happens:** Launch packaging often chases polish and forgets product honesty.
**How to avoid:** Use only Phase 4-validated demo states and single technical sentences that the current parser handles well.

### Pitfall 2: README links point to files that do not exist or drift later
**What goes wrong:** Visitors click `Examples` or asset links and hit missing files or stale references.
**Why it happens:** Assets and links are updated manually in separate steps.
**How to avoid:** Pick stable filenames early and protect them with a validation script.

### Pitfall 3: The examples corpus becomes marketing copy
**What goes wrong:** Example sentences are polished slogans instead of real technical-doc style inputs.
**Why it happens:** Repo copy and examples get written by the same mindset.
**How to avoid:** Keep examples sourced from setup-guide, API-doc, README, and AI-tooling sentence styles.

### Pitfall 4: `good first issue` is named but not actually reachable
**What goes wrong:** CONTRIBUTING mentions beginner-friendly work, but visitors have no link to find it.
**Why it happens:** GitHub label routes are easy to forget during copy updates.
**How to avoid:** Add an explicit label-filtered issue link in the public issue landing flow.
</common_pitfalls>

<validation_architecture>
## Validation Architecture

Phase 5 should validate at three levels:

1. **Launch package integrity**
   - Verify that `assets/hero.gif`, screenshot files, social preview, and the canonical examples file all exist.
   - Verify that README and contribution surfaces link to those exact files.

2. **Feedback routing integrity**
   - Verify that public repo copy mentions the GitHub-native issue paths.
   - Verify that `.github/ISSUE_TEMPLATE/config.yml` exposes a visible `good first issue` route.

3. **Product honesty + repo health**
   - Re-run `pnpm check`, `pnpm test`, and `pnpm build`.
   - Use one PowerShell entrypoint so the launch package is checked the same way as earlier phases.

This phase still needs one human visual check: the hero GIF and social preview should communicate the product clearly without over-claiming what the parser can do.
</validation_architecture>

<open_questions>
## Open Questions

1. **Should the repo keep only one canonical examples file or split examples by source domain immediately?**
   - What we know: the first release only needs one obvious corpus path
   - Recommendation: start with one canonical launch examples file and split later only if growth demands it

2. **Should Phase 5 introduce automated screenshot generation?**
   - What we know: this phase only needs a small fixed asset pack
   - Recommendation: no; static committed assets are the better KISS choice unless execution proves impossible without automation
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `.planning/phases/05-launch-assets-and-feedback-intake/05-CONTEXT.md`
- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md`
- `.planning/phases/04-ir-and-white-box-correction-loop/04-02-SUMMARY.md`
- `.planning/phases/04-ir-and-white-box-correction-loop/04-UAT.md`
- `README.md`
- `CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/parser_example.md`

### Secondary (MEDIUM confidence)
- `.github/ISSUE_TEMPLATE/config.yml`
- `assets/hero.gif`
- `src/App.tsx`
- `src/components/demo/*`

### Tertiary (LOW confidence - needs execution validation)
- None
</sources>

<metadata>
## Metadata

**Research scope:**
- Launch assets
- Public examples corpus
- GitHub-native feedback routing
- Validation strategy for release packaging

**Confidence breakdown:**
- Launch packaging approach: HIGH
- Examples corpus structure: HIGH
- Feedback routing approach: HIGH
- Validation approach: HIGH

**Research date:** 2026-04-14
**Valid until:** 2026-05-14
</metadata>

---

*Phase: 05-launch-assets-and-feedback-intake*
*Research completed: 2026-04-14*
*Ready for planning: yes*
