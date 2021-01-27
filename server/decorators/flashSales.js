const FlashSale = require("../Controller/flasSaleCtrl");
module.exports = (app) => {
  app.post("/saveFlasSAleForm", FlashSale.saveFlasSAletemplate);
  app.post("/updateFlasSAletemplate", FlashSale.updateFlasSAletemplate);
  app.post("/flashsale", FlashSale.deleteCompaign);
};
