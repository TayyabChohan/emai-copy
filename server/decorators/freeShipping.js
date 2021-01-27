const FreeShipping = require("../Controller/freeShippingCtrl");
module.exports = (app) => {
  app.post("/savefreeShippingForm", FreeShipping.saveFreeShippingtemplate);
  app.post(
    "/updateFreeShippingtemplate",
    FreeShipping.updateFreeShippingtemplate
  );
  app.post(
    "/freeshipping",
    FreeShipping.deleteCompaign
  );
};
