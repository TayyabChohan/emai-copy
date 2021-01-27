const webinarPromo = require("../Controller/wabinarPromoCtrl");
module.exports = (app) => {
  app.post("/savewebinarPromoForm", webinarPromo.saveWabinarPromomplate);
  app.post("/updateWabinarPromomplate", webinarPromo.updateWabinarPromomplate);
  app.post("/webinarpromo", webinarPromo.deleteCompaign);
};
