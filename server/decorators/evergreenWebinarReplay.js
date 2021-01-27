const WebinarReplay = require("../Controller/evergreenWebinarReplayCtrl");
module.exports = (app) => {
  app.post("/webinarReplayTemplate", WebinarReplay.webinarReplayTemplate);
  app.post(
    "/updateWebinarReplayTemplate",
    WebinarReplay.updateWebinarReplayTemplate
  );
  app.post(
    "/evergreenwebinarreplay",
    WebinarReplay.deleteCompaign
  );
};
