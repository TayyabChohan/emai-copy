const LmsVideo = require("../Controller/lmzVideoCtrl");
module.exports = (app) => {
  app.post("/saveLmsVideoForm", LmsVideo.saveLmsVideoTemplate);
  app.post("/updateLmsVideoTemplate", LmsVideo.updateLmsVideoTemplate);
  app.post("/lmsvideo", LmsVideo.deleteCompaign);
};
