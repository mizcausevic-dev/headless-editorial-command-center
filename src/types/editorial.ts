export type QueueStatus = "healthy" | "watch" | "blocked";

export type EditorialItem = {
  itemKey: string;
  title: string;
  route: string;
  contentType: string;
  locale: string;
  owner: string;
  status: QueueStatus;
  previewStatus: "ready" | "degraded" | "blocked";
  buildStatus: "clean" | "warning" | "failed";
  validationGapDays: number;
  blockers: string[];
  note: string;
  recommendation: string;
};

export type ReleaseBlocker = {
  itemKey: string;
  title: string;
  severity: "breaking" | "watch";
  owner: string;
  summary: string;
  reason: string;
};

export type VerificationLane = {
  label: string;
  status: QueueStatus;
  detail: string;
};
