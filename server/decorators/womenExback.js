const WomenExBack = require("../Controller/womenExBackCtrl");
module.exports = (app) => {
  app.post("/savewomenExbackForm", WomenExBack.savewomenExbacktemplate);
  app.post("/updateWomenExbacktemplate", WomenExBack.updateWomenExbacktemplate);
  app.post("/womenexback", WomenExBack.deleteCompaign);
};
