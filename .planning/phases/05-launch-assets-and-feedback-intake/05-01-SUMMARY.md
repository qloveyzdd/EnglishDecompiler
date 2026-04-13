---
phase: 05-launch-assets-and-feedback-intake
plan: 01
subsystem: launch-assets-and-examples
tags: [summary, assets, examples, gif, screenshots, social-preview]
requires:
  - phase: 04-ir-and-white-box-correction-loop
    provides: validated demo states, correction loop, json + ir output
provides:
  - Canonical launch examples corpus
  - Fixed screenshot set for repo launch
  - Social preview image
  - Upgraded hero GIF at the existing README path
  - Asset manifest linking media to example IDs
affects: [assets, examples, launch-copy]
tech-stack:
  added: []
  patterns: [repo-native launch pack, sentence-first example corpus, stable asset filenames]
key-files:
  created: [examples/launch-examples.json, assets/launch/asset-manifest.json, assets/launch/demo-overview.png, assets/launch/correction-loop.png, assets/launch/json-ir-view.png, assets/social-preview.png]
  modified: [assets/hero.gif]
key-decisions:
  - "The launch pack stays repo-native: hero GIF, screenshots, social preview, and examples all live in the repository."
  - "Launch media only shows Phase 4-validated single-sentence workflows and does not hint at broader parser scope."
patterns-established:
  - "The public examples corpus is machine-readable and reusable instead of being scattered across README prose."
  - "The README hero path stays stable while the media behind it improves."
requirements-completed: [REPO-03]
duration: 8 min
completed: 2026-04-14
---

# Phase 5 Plan 01 Summary

## Accomplishments

- Created the canonical launch examples corpus at `examples/launch-examples.json`
- Generated the fixed launch image set: overview, correction-loop, JSON+IR, and social preview
- Replaced the placeholder hero with a polished workflow GIF while keeping the public path `assets/hero.gif`
- Added `assets/launch/asset-manifest.json` so launch copy can point to stable asset and example IDs

## Files

- `examples/launch-examples.json` - canonical public sentence corpus for launch and future parser-example intake
- `assets/launch/demo-overview.png` - three-pane parse overview
- `assets/launch/correction-loop.png` - token correction and saved-local state
- `assets/launch/json-ir-view.png` - synchronized JSON + IR output view
- `assets/social-preview.png` - GitHub/social share image
- `assets/hero.gif` - upgraded README hero media
- `assets/launch/asset-manifest.json` - launch asset map plus source example IDs

## Auto-fixed Issues

- Pillow was not available in the local Python environment, so I installed it in the user environment and generated the assets through a one-off script instead of introducing a repo dependency
- The first image-generation pass produced cramped headers, so I regenerated the assets with wrapped title text and cleaner spacing

## Verification

- `Test-Path assets/hero.gif`
- `Test-Path assets/social-preview.png`
- `Test-Path assets/launch/demo-overview.png`
- `Test-Path assets/launch/correction-loop.png`
- `Test-Path assets/launch/json-ir-view.png`
- `Test-Path assets/launch/asset-manifest.json`
- `Test-Path examples/launch-examples.json`

## Next

- Wave 2 wires the new assets and examples into `README`, contribution surfaces, and the Phase 5 validation entrypoint
