const ColdProspecting = require("../Controller/coldSimpleProspectingEmailCtrl");
module.exports = (app) => {
  app.post(
    "/coldSimpleProspectingEmailTemplate",
    ColdProspecting.coldSimpleProspectingEmailTemplate
  );
  app.post(
    "/updateColdSimpleProspectingEmailTemplate",
    ColdProspecting.updateColdSimpleProspectingEmailTemplate
  );
  app.post(
    "/coldsimpleprospectingemail",
    ColdProspecting.deleteCompaign
  );
};
