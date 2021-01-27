const GuitarNiche = require("../Controller/guitarNicheCtrl");
module.exports = (app) => {
  app.post("/guitarNicheTemplate", GuitarNiche.guitarNicheTemplate);
  app.post("/updateGuitarNicheTemplate", GuitarNiche.updateGuitarNicheTemplate);
  app.post("/guitarniche", GuitarNiche.deleteCompaign);
};
