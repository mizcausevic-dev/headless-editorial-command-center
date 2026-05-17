import { blockers, previewReadiness, summary } from "../src/services/editorialService";

console.log(
  JSON.stringify(
    {
      dashboard: summary(),
      blockedRoutes: blockers(),
      previewSnapshot: previewReadiness().map((item) => ({
        itemKey: item.itemKey,
        previewStatus: item.previewStatus,
        buildStatus: item.buildStatus,
        blockerCount: item.blockers.length
      }))
    },
    null,
    2
  )
);
