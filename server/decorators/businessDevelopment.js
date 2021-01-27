const BusinessDevelopment = require("../Controller/businessDevelopmentCtrl");
module.exports = (app) => {
  app.post(
    "/businessDevelopmentTemplate",
    BusinessDevelopment.businessDevelopmentTemplate
  );
  app.post(
    "/updateBusinessDevelopmentTemplate",
    BusinessDevelopment.updateBusinessDevelopmentTemplate
  );
  app.post(
    "/businessdevelopment",
    BusinessDevelopment.deleteCompaign
  );
};
