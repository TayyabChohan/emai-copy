const LmsSeries = require("../Controller/leadMagnetSequenceMultipleVideoCtrl");
module.exports = (app) => {
  app.post(
    "/leadMagnetSequenceMultipleVideoTemplate",
    LmsSeries.leadMagnetSequenceMultipleVideoTemplate
  );
  app.post(
    "/updateLeadMagnetSequenceMultipleVideoTemplate",
    LmsSeries.updateLeadMagnetSequenceMultipleVideoTemplate
  );
  app.post(
    "/leadmagnetsequencemultiplevideo",
    LmsSeries.deleteCompaign
  );
};
