const Weddings = require("../Controller/weddingsCtrl");
module.exports = (app) => {
  app.post("/weddingsTemplate", Weddings.weddingsTemplate);
  app.post("/updateWeddingsTemplate", Weddings.updateWeddingsTemplate);
  app.post("/weddings", Weddings.deleteCompaign);
};
