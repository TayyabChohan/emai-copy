const PaleoLifestyle = require("../Controller/paleoLifestyleCtrl");
module.exports = (app) => {
  app.post("/paleoLifestyleTemplate", PaleoLifestyle.paleoLifestyleTemplate);
  app.post(
    "/updatePaleoLifestyleTemplate",
    PaleoLifestyle.updatePaleoLifestyleTemplate
  );
  app.post(
    "/paleolifestyle",
    PaleoLifestyle.deleteCompaign
  );
};
