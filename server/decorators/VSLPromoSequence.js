const VSLPromo = require("../Controller/VSLPromoSequenceCtrl");
module.exports = (app) => {
  app.post("/VSLPromoSequenceTemplate", VSLPromo.VSLPromoSequenceTemplate);
  app.post(
    "/updateVSLPromoSequenceTemplate",
    VSLPromo.updateVSLPromoSequenceTemplate
  );
  app.post(
    "/vslpromosequence",
    VSLPromo.deleteCompaign
  );
};
