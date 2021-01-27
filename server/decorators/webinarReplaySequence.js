const WebinarReplaySeq = require("../Controller/webinarReplaySequenceCtrl");
module.exports = (app) => {
  app.post(
    "/webinarReplaySeqTemplate",
    WebinarReplaySeq.webinarReplaySeqTemplate
  );
  app.post(
    "/updateWebinarReplaySeqTemplate",
    WebinarReplaySeq.updateWebinarReplaySeqTemplate
  );
  app.post(
    "/webinarreplaysequence",
    WebinarReplaySeq.deleteCompaign
  );
};
