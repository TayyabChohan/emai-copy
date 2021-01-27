const SurvivalNiche = require("../Controller/survivalNicheCtrl");
module.exports = (app) => {
  app.post("/survivalNicheTemplate", SurvivalNiche.survivalNicheTemplate);
  app.post(
    "/updateSurvivalNicheTemplate",
    SurvivalNiche.updateSurvivalNicheTemplate
  );
  app.post(
    "/survivalniche",
    SurvivalNiche.deleteCompaign
  );
};
