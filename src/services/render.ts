import { blockers, previewReadiness, queue, summary, verification } from "./editorialService";

function shell(active: string, title: string, eyebrow: string, hero: string, intro: string, content: string) {
  const stats = summary();
  const links = [
    { href: "/", label: "Overview" },
    { href: "/queue", label: "Queue" },
    { href: "/preview-readiness", label: "Preview readiness" },
    { href: "/release-blockers", label: "Release blockers" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  const nav = links
    .map(({ href, label }) => `<a class="${href === active ? "nav-link is-active" : "nav-link"}" href="${href}">${label}</a>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111f;
        --panel: rgba(13, 22, 40, 0.94);
        --panel-soft: rgba(18, 29, 50, 0.88);
        --line: rgba(125, 169, 255, 0.12);
        --text: #f5f8ff;
        --muted: #9baccb;
        --accent: #79a8ff;
        --accent-2: #8e7bff;
        --good: #39c978;
        --watch: #f4c15b;
        --bad: #ff6f87;
        --shadow: 0 28px 70px rgba(0, 0, 0, 0.36);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(121, 168, 255, 0.18), transparent 22%),
          radial-gradient(circle at top right, rgba(142, 123, 255, 0.14), transparent 18%),
          linear-gradient(180deg, #07101b 0%, #0b1423 100%);
      }
      .page { width: min(1480px, calc(100% - 48px)); margin: 28px auto 44px; }
      .topbar {
        display: flex; align-items: center; justify-content: space-between; gap: 20px;
        padding: 18px 20px; border: 1px solid var(--line); border-radius: 28px;
        background: rgba(7, 15, 29, 0.92); box-shadow: var(--shadow);
      }
      .brand { display: flex; align-items: center; gap: 16px; min-width: 0; }
      .brand-badge {
        width: 54px; height: 54px; border-radius: 18px; display: grid; place-items: center;
        font-weight: 700; color: #fff; background: linear-gradient(135deg, #4d8cff, #8f7cff);
      }
      .brand-title { margin: 0; font-size: 17px; font-weight: 700; }
      .brand-subtitle { margin-top: 4px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #93c0ff; font-weight: 600; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
      .nav-link {
        padding: 12px 18px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.08);
        color: #d8e2f6; text-decoration: none; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700;
      }
      .nav-link.is-active { color: #fff; border-color: transparent; background: linear-gradient(135deg, #4d8cff, #8f7cff); }
      .hero {
        margin-top: 22px; padding: 38px; border-radius: 32px; border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(12, 20, 37, 0.95), rgba(9, 16, 30, 0.95)); box-shadow: var(--shadow);
      }
      .eyebrow { margin: 0 0 16px; color: var(--accent); font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 700; }
      h1 { margin: 0; max-width: 1100px; font-family: "IBM Plex Serif", Georgia, serif; font-size: clamp(52px, 5vw, 80px); line-height: 0.95; letter-spacing: -0.04em; }
      .intro { max-width: 980px; margin: 20px 0 0; color: var(--muted); font-size: 18px; line-height: 1.56; }
      .lead {
        margin-top: 24px; padding: 18px 20px; border-radius: 22px; border: 1px solid rgba(121,168,255,0.16);
        background: rgba(121,168,255,0.08);
      }
      .lead-label { margin: 0 0 8px; color: var(--accent); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; }
      .lead-copy { margin: 0; font-size: 17px; font-weight: 700; }
      .metrics { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 18px; margin-top: 26px; }
      .card { padding: 24px; border-radius: 28px; border: 1px solid var(--line); background: var(--panel-soft); }
      .metric-label, .meta-key { margin: 0; color: var(--muted); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; }
      .metric-value { margin: 14px 0 8px; font-size: 54px; line-height: 0.95; font-weight: 700; }
      .metric-copy, .section-copy, .small { color: var(--muted); font-size: 15px; line-height: 1.52; }
      .section-grid { display: grid; grid-template-columns: 1.18fr 0.9fr; gap: 18px; margin-top: 18px; }
      .section-title { margin: 0 0 12px; font-family: "IBM Plex Serif", Georgia, serif; font-size: 36px; line-height: 1.02; letter-spacing: -0.03em; }
      .list { display: grid; gap: 14px; }
      .item { padding: 18px 20px; border-radius: 22px; border: 1px solid var(--line); background: rgba(255,255,255,0.02); }
      .item-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 18px; }
      .item-title { margin: 0; font-size: 28px; line-height: 1.04; font-weight: 700; }
      .item-subtitle { margin: 8px 0 0; color: var(--muted); font-size: 14px; }
      .status { display: inline-flex; align-items: center; padding: 10px 14px; border-radius: 999px; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; white-space: nowrap; }
      .status.healthy, .status.ready, .status.clean { color: var(--good); background: rgba(57, 201, 120, 0.12); }
      .status.watch, .status.degraded, .status.warning { color: var(--watch); background: rgba(244, 193, 91, 0.12); }
      .status.blocked, .status.breaking, .status.failed { color: var(--bad); background: rgba(255, 111, 135, 0.12); }
      .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
      .chip { display: inline-flex; align-items: center; padding: 8px 12px; border-radius: 999px; background: rgba(121,168,255,0.12); color: #b6d3ff; font-size: 12px; font-weight: 700; }
      .meta-row { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; margin-top: 14px; }
      .meta { padding: 14px 16px; border-radius: 18px; background: rgba(255,255,255,0.03); }
      .meta-value { margin: 8px 0 0; font-size: 24px; line-height: 1; font-weight: 700; }
      .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
      .table th, .table td { padding: 14px 12px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
      .table th { color: var(--muted); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }
      code { font-family: "IBM Plex Mono", monospace; }
      .docs-list { display: grid; gap: 14px; }
      @media (max-width: 1180px) { .metrics, .meta-row, .section-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 860px) {
        .page { width: min(100% - 24px, 1480px); margin-top: 16px; }
        .topbar { flex-direction: column; align-items: stretch; }
        .nav { justify-content: flex-start; }
        .metrics, .meta-row, .section-grid { grid-template-columns: 1fr; }
        .item-top { flex-direction: column; }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="topbar">
        <div class="brand">
          <div class="brand-badge">EC</div>
          <div>
            <p class="brand-title">Headless Editorial Command Center</p>
            <div class="brand-subtitle">Headless WordPress Editorial Operating Surface</div>
          </div>
        </div>
        <nav class="nav">${nav}</nav>
      </header>

      <section class="hero">
        <p class="eyebrow">${eyebrow}</p>
        <h1>${hero}</h1>
        <p class="intro">${intro}</p>
        <div class="lead">
          <p class="lead-label">Lead recommendation</p>
          <p class="lead-copy">${stats.leadRecommendation}</p>
        </div>
        ${content}
      </section>
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const metricCards = [
    ["Items tracked", String(stats.itemCount), "Editorial routes and content surfaces currently under operational review."],
    ["Blocked items", String(stats.blockedCount), "Routes that should not publish until preview and build posture are restored."],
    ["Preview blocked", String(stats.previewBlockedCount), "Editorial surfaces still missing trustworthy preview behavior."],
    ["Ready coverage", `${stats.readyCoverage}%`, "Editorial items currently passing queue, preview, and build checks cleanly."]
  ].map(([label, value, copy]) => `
      <article class="card">
        <p class="metric-label">${label}</p>
        <p class="metric-value">${value}</p>
        <p class="metric-copy">${copy}</p>
      </article>`).join("");

  const queueItems = queue().slice(0, 2).map((item) => `
      <article class="item">
        <div class="item-top">
          <div>
            <h3 class="item-title">${item.title}</h3>
            <p class="item-subtitle"><code>${item.route}</code> · ${item.contentType} · ${item.locale}</p>
          </div>
          <span class="status ${item.status}">${item.status}</span>
        </div>
        <div class="meta-row">
          <div class="meta"><p class="meta-key">Preview</p><p class="meta-value">${item.previewStatus}</p></div>
          <div class="meta"><p class="meta-key">Build</p><p class="meta-value">${item.buildStatus}</p></div>
          <div class="meta"><p class="meta-key">Gap</p><p class="meta-value">${item.validationGapDays}d</p></div>
          <div class="meta"><p class="meta-key">Blockers</p><p class="meta-value">${item.blockers.length}</p></div>
        </div>
        <p class="small">${item.recommendation}</p>
        <div class="chips">${item.blockers.map((blocker) => `<span class="chip">${blocker}</span>`).join("") || `<span class="chip">No blockers</span>`}</div>
      </article>`).join("");

  const blockerItems = blockers().map((item) => `
      <article class="item">
        <div class="item-top">
          <div>
            <h3 class="item-title">${item.title}</h3>
            <p class="item-subtitle">${item.owner}</p>
          </div>
          <span class="status ${item.severity}">${item.severity}</span>
        </div>
        <p class="small"><strong>${item.summary}</strong></p>
        <p class="small">${item.reason}</p>
      </article>`).join("");

  return shell(
    "/",
    "Headless Editorial Command Center",
    "Headless editorial command center",
    "Keep queue health, preview readiness, and publish blockers visible before editorial work goes live.",
    "Headless editorial teams need more than a publish button. They need to know which routes are safe, which previews are trustworthy, which builds are failing, and which localized or search surfaces are drifting toward release risk.",
    `
      <section class="metrics">${metricCards}</section>
      <section class="section-grid">
        <article class="card">
          <h2 class="section-title">Which editorial items are closest to breaking delivery.</h2>
          <p class="section-copy">Queue health only matters if it tells the team which routes are unsafe to release and why.</p>
          <div class="list">${queueItems}</div>
        </article>
        <article class="card">
          <h2 class="section-title">Which blockers deserve intervention first.</h2>
          <p class="section-copy">Preview trust, build failures, and answer-surface mismatches should show up together in one editorial release view.</p>
          <div class="list">${blockerItems}</div>
        </article>
      </section>`
  );
}

export function renderQueue() {
  const rows = queue().map((item) => `
      <tr>
        <td><strong>${item.title}</strong><div class="small"><code>${item.route}</code></div></td>
        <td>${item.contentType}</td>
        <td>${item.locale}</td>
        <td>${item.owner}</td>
        <td><span class="status ${item.previewStatus}">${item.previewStatus}</span></td>
        <td><span class="status ${item.buildStatus}">${item.buildStatus}</span></td>
        <td>${item.validationGapDays}d</td>
        <td><span class="status ${item.status}">${item.status}</span></td>
      </tr>`).join("");

  return shell(
    "/queue",
    "Editorial Queue",
    "Editorial queue",
    "See the headless WordPress release queue in one operational view.",
    "The queue should show owner, locale, preview posture, build health, and route status together or teams will still miss the real blockers.",
    `
      <section class="section-grid" style="grid-template-columns: 1fr;">
        <article class="card">
          <h2 class="section-title">Every editorial item that matters before release.</h2>
          <p class="section-copy">This view turns editorial work into a release queue instead of a loose pile of tickets, previews, and build notifications.</p>
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Locale</th>
                <th>Owner</th>
                <th>Preview</th>
                <th>Build</th>
                <th>Gap</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </article>
      </section>`
  );
}

export function renderPreviewReadiness() {
  const items = previewReadiness().map((item) => `
      <article class="item">
        <div class="item-top">
          <div>
            <h3 class="item-title">${item.title}</h3>
            <p class="item-subtitle"><code>${item.route}</code></p>
          </div>
          <span class="status ${item.previewStatus}">${item.previewStatus}</span>
        </div>
        <div class="meta-row">
          <div class="meta"><p class="meta-key">Build</p><p class="meta-value">${item.buildStatus}</p></div>
          <div class="meta"><p class="meta-key">Gap</p><p class="meta-value">${item.validationGapDays}d</p></div>
          <div class="meta"><p class="meta-key">Blockers</p><p class="meta-value">${item.blockers.length}</p></div>
          <div class="meta"><p class="meta-key">Route</p><p class="meta-value">${item.route}</p></div>
        </div>
        <div class="chips">${item.blockers.map((blocker) => `<span class="chip">${blocker}</span>`).join("") || `<span class="chip">Preview is clear</span>`}</div>
      </article>`).join("");

  return shell(
    "/preview-readiness",
    "Preview Readiness",
    "Preview readiness",
    "Know whether headless previews are trustworthy before editors depend on them.",
    "Preview trust is a real operating system concern. When preview routes degrade, editorial teams start shipping with less confidence and more rework.",
    `
      <section class="section-grid" style="grid-template-columns: 1fr;">
        <article class="card">
          <h2 class="section-title">The preview surface every headless team should watch.</h2>
          <p class="section-copy">This is where broken route dependencies, payload drift, and translation or search mismatches should be visible before editorial work goes live.</p>
          <div class="list">${items}</div>
        </article>
      </section>`
  );
}

export function renderReleaseBlockers() {
  const items = blockers().map((item) => `
      <article class="item">
        <div class="item-top">
          <div>
            <h3 class="item-title">${item.title}</h3>
            <p class="item-subtitle">${item.owner}</p>
          </div>
          <span class="status ${item.severity}">${item.severity}</span>
        </div>
        <p class="small"><strong>${item.summary}</strong></p>
        <p class="small">${item.reason}</p>
      </article>`).join("");

  return shell(
    "/release-blockers",
    "Release Blockers",
    "Release blockers",
    "Focus the team on the routes that are truly unsafe to ship.",
    "Not every warning should block a release. This view is for the surfaces where preview trust, build health, or payload dependencies are bad enough to stop the lane.",
    `
      <section class="section-grid" style="grid-template-columns: 1fr;">
        <article class="card">
          <h2 class="section-title">Blockers tied to real editorial routes and owners.</h2>
          <p class="section-copy">The point is not more dashboards. The point is making release risk clear enough that editors, platform engineers, and content leads all know what has to move first.</p>
          <div class="list">${items}</div>
        </article>
      </section>`
  );
}

export function renderVerification() {
  const lanes = verification().map((lane) => `
      <article class="item">
        <div class="item-top">
          <div>
            <h3 class="item-title">${lane.label}</h3>
            <p class="item-subtitle">${lane.detail}</p>
          </div>
          <span class="status ${lane.status}">${lane.status}</span>
        </div>
      </article>`).join("");

  return shell(
    "/verification",
    "Verification",
    "Verification lanes",
    "Make editorial release posture something the operating layer can verify clearly.",
    "Verification should prove that previews can be trusted, builds are healthy, and stale or localized content is not quietly dragging routes into release risk.",
    `
      <section class="section-grid">
        <article class="card">
          <h2 class="section-title">The operating proof that matters.</h2>
          <p class="section-copy">Verification should tell the team whether the queue is actually safe to release, not just whether content exists in the CMS.</p>
          <div class="list">${lanes}</div>
        </article>
        <article class="card">
          <h2 class="section-title">What a passing gate should mean.</h2>
          <div class="docs-list">
            <div><strong>1.</strong> <code>Critical routes have trustworthy preview behavior.</code></div>
            <div><strong>2.</strong> <code>Build failures and stale payload dependencies are visible before publish.</code></div>
            <div><strong>3.</strong> <code>Localization and search surfaces are not quietly degrading delivery quality.</code></div>
            <div><strong>4.</strong> <code>Blocked items stay out of release until the route truly passes again.</code></div>
          </div>
        </article>
      </section>`
  );
}

export function renderDocs() {
  return shell(
    "/docs",
    "Docs",
    "Docs",
    "Understand the surfaces this editorial operations starter is modeling.",
    "This repo is intentionally scoped like a portfolio proof system: realistic enough to show editorial and release coordination across a headless WordPress estate without pretending to be a production CMS platform.",
    `
      <section class="section-grid" style="grid-template-columns: 1fr;">
        <article class="card">
          <h2 class="section-title">What this starter includes.</h2>
          <div class="docs-list">
            <div><strong>Overview:</strong> queue health, preview trust, build failures, and stale item pressure.</div>
            <div><strong>Queue:</strong> every editorial item that matters before release, with owner and status context.</div>
            <div><strong>Preview readiness:</strong> route-level preview posture with blockers and build dependencies.</div>
            <div><strong>Release blockers:</strong> the items that should actually stop the lane.</div>
            <div><strong>Verification:</strong> a release proof layer for preview, build, stale content, and localization posture.</div>
          </div>
        </article>
      </section>`
  );
}
