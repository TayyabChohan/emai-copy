const Relaunch = require("../Controller/waitingListRelaunchCtrl");
module.exports = (app) => {
  app.post(
    "/waitingListRelaunchTemplate",
    Relaunch.waitingListRelaunchTemplate
  );
  app.post(
    "/updateWaitingListRelaunchTemplate",
    Relaunch.updateWaitingListRelaunchTemplate
  );
  app.post(
    "/updateWaitingListRelaunchTemplate",
    Relaunch.updateWaitingListRelaunchTemplate
  );
  app.post(
    "/waitinglistrelaunch",
    Relaunch.deleteCompaign
  );
};
