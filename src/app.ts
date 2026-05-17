import express from "express";

import { blockers, payload, previewReadiness, queue, summary, verification } from "./services/editorialService";
import {
  renderDocs,
  renderOverview,
  renderPreviewReadiness,
  renderQueue,
  renderReleaseBlockers,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5238);

app.get("/", (_req, res) => {
  res.type("html").send(renderOverview());
});

app.get("/queue", (_req, res) => {
  res.type("html").send(renderQueue());
});

app.get("/preview-readiness", (_req, res) => {
  res.type("html").send(renderPreviewReadiness());
});

app.get("/release-blockers", (_req, res) => {
  res.type("html").send(renderReleaseBlockers());
});

app.get("/verification", (_req, res) => {
  res.type("html").send(renderVerification());
});

app.get("/docs", (_req, res) => {
  res.type("html").send(renderDocs());
});

app.get("/api/dashboard/summary", (_req, res) => {
  res.json(summary());
});

app.get("/api/queue", (_req, res) => {
  res.json(queue());
});

app.get("/api/preview-readiness", (_req, res) => {
  res.json(previewReadiness());
});

app.get("/api/release-blockers", (_req, res) => {
  res.json(blockers());
});

app.get("/api/verification", (_req, res) => {
  res.json(verification());
});

app.get("/api/sample", (_req, res) => {
  res.json(payload());
});

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Headless Editorial Command Center listening on http://127.0.0.1:${port}`);
  });
}

export default app;
