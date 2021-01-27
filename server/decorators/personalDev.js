const PersonalDevs = require("../Controller/personalDevsCtrl");
module.exports = (app) => {
  app.post(
    "/savePersonalDevelopmentsForm",
    PersonalDevs.savePersonalDevsTemplate
  );
  app.post(
    "/updatePersonalDevsTemplate",
    PersonalDevs.updatePersonalDevsTemplate
  );
  app.post(
    "/personaldevelopment",
    PersonalDevs.deleteCompaign
  );
};
