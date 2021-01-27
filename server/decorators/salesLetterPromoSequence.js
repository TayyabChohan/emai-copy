const SalesLetterPromo = require("../Controller/salesLetterPromoSequenceCtrl");
module.exports = (app) => {
  app.post(
    "/SalesLetterPromoTemplate",
    SalesLetterPromo.SalesLetterPromoTemplate
  );
  app.post(
    "/updateSalesLetterPromoTemplate",
    SalesLetterPromo.updateSalesLetterPromoTemplate
  );
  app.post(
    "/salesletterpromosequence",
    SalesLetterPromo.deleteCompaign
  );
};
