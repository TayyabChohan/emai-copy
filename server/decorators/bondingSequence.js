const Bonding = require("../Controller/bondingSequenceCtrl");

module.exports = (app) => {
  app.post("/bondingSequenceTemplate", Bonding.bondingSequenceTemplate);
  app.post(
    "/updateBondingSequenceTemplate",
    Bonding.updateBondingSequenceTemplate
  );
  app.post(
    "/bondingsequence",
    Bonding.deleteCompaign
  );
};
