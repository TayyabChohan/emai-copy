const BusinessOpportunity = require("../Controller/businessOpportunityCtrl");
module.exports = (app) => {
  app.post(
    "/businessOpportunityTemplate",
    BusinessOpportunity.businessOpportunityTemplate
  );
  app.post(
    "/updateBusinessOpportunityTemplate",
    BusinessOpportunity.updateBusinessOpportunityTemplate
  );
  app.post(
    "/businessopportunity",
    BusinessOpportunity.deleteCompaign
  );
};
