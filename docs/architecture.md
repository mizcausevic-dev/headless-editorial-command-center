# Architecture

`headless-editorial-command-center` is a TypeScript starter that models how a headless WordPress team could run editorial queue operations before publish or deploy.

## App surfaces

- `src/app.ts`
  - Express routes and API dispatch
- `src/services/editorialService.ts`
  - dashboard summary, queue items, preview readiness, release blockers, and verification lanes
- `src/services/render.ts`
  - HTML shell and route-specific views
- `src/data/sampleEditorial.ts`
  - modeled editorial routes, queue state, preview issues, build failures, and blockers

## Modeled concerns

- queue health
- preview trust
- build failures
- stale validation windows
- localization drift
- search and answer-surface dependencies
- route-level release blockers

## Goal

Turn headless editorial operations into a readable release control surface instead of a loose collection of CMS drafts, preview links, and build logs.
