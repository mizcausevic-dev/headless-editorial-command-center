import type { EditorialItem, ReleaseBlocker, VerificationLane } from "../types/editorial";

export const editorialItems: EditorialItem[] = [
  {
    itemKey: "pricing-refresh",
    title: "Pricing page refresh",
    route: "/pricing",
    contentType: "landing-page",
    locale: "en-US",
    owner: "growth-editorial",
    status: "watch",
    previewStatus: "degraded",
    buildStatus: "warning",
    validationGapDays: 9,
    blockers: ["Usage meter copy not synced to frontend props"],
    note: "The page is close, but preview still disagrees with the published pricing component state.",
    recommendation: "Resolve the pricing prop mismatch before the next launch review."
  },
  {
    itemKey: "help-installation-guide",
    title: "Installation guide article",
    route: "/help/installing-tile",
    contentType: "help-article",
    locale: "en-US",
    owner: "support-content",
    status: "blocked",
    previewStatus: "blocked",
    buildStatus: "failed",
    validationGapDays: 18,
    blockers: ["Preview route missing canonical topic payload", "Answer packager failed on FAQ typing"],
    note: "This article should not publish until preview and answer-surface payloads are restored.",
    recommendation: "Repair preview payload typing and rerun the article release check before unblocking."
  },
  {
    itemKey: "resource-library-fr",
    title: "Resource library French localization",
    route: "/fr/resources",
    contentType: "resource-archive",
    locale: "fr-FR",
    owner: "localization-ops",
    status: "watch",
    previewStatus: "ready",
    buildStatus: "clean",
    validationGapDays: 13,
    blockers: ["Translation fallback still showing English taxonomy labels"],
    note: "The route renders, but locale-specific taxonomy labels are not fully localized.",
    recommendation: "Clear taxonomy fallback debt before this locale starts receiving paid traffic."
  },
  {
    itemKey: "docs-search-home",
    title: "Docs search landing page",
    route: "/docs/search",
    contentType: "search-shell",
    locale: "en-US",
    owner: "search-platform",
    status: "blocked",
    previewStatus: "degraded",
    buildStatus: "failed",
    validationGapDays: 21,
    blockers: ["Search build missing spell-correction payload", "Result cards changed shape in GraphQL"],
    note: "Search route is carrying both preview degradation and production build failure risk.",
    recommendation: "Hold the release until the search payload contract and preview fixture both pass."
  },
  {
    itemKey: "home-hero-rotation",
    title: "Home hero campaign rotation",
    route: "/",
    contentType: "home-shell",
    locale: "en-US",
    owner: "brand-marketing",
    status: "healthy",
    previewStatus: "ready",
    buildStatus: "clean",
    validationGapDays: 2,
    blockers: [],
    note: "This route is aligned across preview, build, and publish checks.",
    recommendation: "Use this route as the baseline for editorial readiness."
  }
];

export const releaseBlockers: ReleaseBlocker[] = [
  {
    itemKey: "help-installation-guide",
    title: "Installation guide article",
    severity: "breaking",
    owner: "support-content",
    summary: "Preview route is blocked and answer-packaging cannot render FAQ payload safely.",
    reason: "Canonical topic and FAQ typing drift broke both preview trust and downstream answer surfaces."
  },
  {
    itemKey: "docs-search-home",
    title: "Docs search landing page",
    severity: "breaking",
    owner: "search-platform",
    summary: "Search payload no longer matches the result-card shape expected by the frontend.",
    reason: "The route is failing both build validation and preview confidence checks."
  },
  {
    itemKey: "pricing-refresh",
    title: "Pricing page refresh",
    severity: "watch",
    owner: "growth-editorial",
    summary: "Preview and published pricing states are diverging during the campaign refresh.",
    reason: "The route still renders, but product and editorial metadata are not in sync."
  }
];

export const verificationLanes: VerificationLane[] = [
  {
    label: "Preview readiness",
    status: "blocked",
    detail: "Two priority routes still fail preview trust because payload or route dependencies are incomplete."
  },
  {
    label: "Release build health",
    status: "blocked",
    detail: "Search and help surfaces are still failing release-critical build or fixture validations."
  },
  {
    label: "Localization and stale content posture",
    status: "watch",
    detail: "Localization quality and stale queue age are manageable, but still need tighter review before broader rollout."
  }
];
