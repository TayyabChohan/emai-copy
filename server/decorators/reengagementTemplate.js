const ReEngagement = require("../Controller/reengagementTemplate_c");
module.exports = (app) => {
  app.post("/reEngagementTemplate", ReEngagement.reEngagementTemplate);
  app.post(
    "/updateReEngagementTemplate",
    ReEngagement.updateReEngagementTemplate
  );
  app.post("/reengagement", ReEngagement.deleteCompaign);
};
