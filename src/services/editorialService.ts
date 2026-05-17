import { editorialItems, releaseBlockers, verificationLanes } from "../data/sampleEditorial";
import type { EditorialItem, ReleaseBlocker, VerificationLane } from "../types/editorial";

export function summary() {
  const blockedCount = editorialItems.filter((item) => item.status === "blocked").length;
  const watchCount = editorialItems.filter((item) => item.status === "watch").length;
  const previewBlockedCount = editorialItems.filter((item) => item.previewStatus === "blocked").length;
  const failedBuildCount = editorialItems.filter((item) => item.buildStatus === "failed").length;
  const staleItemCount = editorialItems.filter((item) => item.validationGapDays > 14).length;
  const readyCoverage = Math.round(
    (editorialItems.filter((item) => item.status === "healthy").length / Math.max(editorialItems.length, 1)) * 100
  );

  return {
    itemCount: editorialItems.length,
    blockedCount,
    watchCount,
    previewBlockedCount,
    failedBuildCount,
    staleItemCount,
    readyCoverage,
    leadRecommendation:
      "Do not release the help article or docs search surfaces until preview trust and build validation are both restored."
  };
}

export function queue(): EditorialItem[] {
  const rank: Record<EditorialItem["status"], number> = { blocked: 0, watch: 1, healthy: 2 };
  return [...editorialItems].sort((left, right) => rank[left.status] - rank[right.status]);
}

export function previewReadiness() {
  return queue().map((item) => ({
    itemKey: item.itemKey,
    title: item.title,
    route: item.route,
    previewStatus: item.previewStatus,
    buildStatus: item.buildStatus,
    validationGapDays: item.validationGapDays,
    blockers: item.blockers
  }));
}

export function blockers(): ReleaseBlocker[] {
  const rank: Record<ReleaseBlocker["severity"], number> = { breaking: 0, watch: 1 };
  return [...releaseBlockers].sort((left, right) => rank[left.severity] - rank[right.severity]);
}

export function verification(): VerificationLane[] {
  const rank: Record<VerificationLane["status"], number> = { blocked: 0, watch: 1, healthy: 2 };
  return [...verificationLanes].sort((left, right) => rank[left.status] - rank[right.status]);
}

export function payload() {
  return {
    dashboard: summary(),
    queue: queue(),
    previewReadiness: previewReadiness(),
    blockers: blockers(),
    verification: verification()
  };
}
