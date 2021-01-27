const Ascesion = require("../Controller/ascensionTemplateCtrl");

module.exports = (app) => {
  app.post("/ascensionSeriesTemplate", Ascesion.ascensionSeriesTemplate);
  app.post(
    "/updateAscensionSeriesTemplate",
    Ascesion.updateAscensionSeriesTemplate
  );
  app.post(
    "/ascensionseries",
    Ascesion.deleteCompaign
  );
};
