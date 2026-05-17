import { describe, expect, test } from "vitest";

import { blockers, payload, previewReadiness, queue, summary, verification } from "./services/editorialService";

describe("headless-editorial-command-center", () => {
  test("summary reflects blocked editorial posture", () => {
    const stats = summary();
    expect(stats.itemCount).toBe(5);
    expect(stats.blockedCount).toBeGreaterThan(0);
    expect(stats.failedBuildCount).toBeGreaterThan(0);
  });

  test("queue and blockers expose release-critical items", () => {
    expect(queue().some((item) => item.blockers.length > 0)).toBe(true);
    expect(blockers().some((item) => item.severity === "breaking")).toBe(true);
  });

  test("payload includes preview and verification lanes", () => {
    expect(previewReadiness().length).toBe(5);
    expect(verification().length).toBe(3);
    expect(payload()).toHaveProperty("dashboard");
  });
});
