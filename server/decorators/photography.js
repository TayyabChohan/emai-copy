const PhotoGray = require("../Controller/photoGraphyCtrl");
module.exports = (app) => {
  app.post("/savePhotographyNicheForm", PhotoGray.savePhotographyTemplate);
  app.post("/updatePhotographyTemplate", PhotoGray.updatePhotographyTemplate);
  app.post("/photographyniche", PhotoGray.deleteCompaign);
};
