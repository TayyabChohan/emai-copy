const WomenHealth = require("../Controller/womenHealthCtrl");
module.exports = (app) => {
  app.post("/womenHealthTemplate", WomenHealth.womenHealthTemplate);
  app.post("/updateWomenHealthTemplate", WomenHealth.updateWomenHealthTemplate);
  app.post("/womenhealth", WomenHealth.deleteCompaign);
};
