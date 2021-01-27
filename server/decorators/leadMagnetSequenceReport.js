const LmsReport = require("../Controller/leadMagnetSequenceReportCtrl");
module.exports = (app) => {
  app.post(
    "/leadMagnetSequenceReportTemplate",
    LmsReport.leadMagnetSequenceReportTemplate
  );
  app.post(
    "/updateLeadMagnetSequenceReportTemplate",
    LmsReport.updateLeadMagnetSequenceReportTemplate
  );
  app.post(
    "/leadmagnetsequencereport",
    LmsReport.deleteCompaign
  );
};
