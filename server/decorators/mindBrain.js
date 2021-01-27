const MindBrain = require("../Controller/mindBrainCtrl");
module.exports = (app) => {
  app.post("/mindBrainTemplate", MindBrain.mindBrainTemplate);
  app.post("/updateMindBrainTemplate", MindBrain.updateMindBrainTemplate);
  app.post("/mindbrain", MindBrain.deleteCompaign);
};
