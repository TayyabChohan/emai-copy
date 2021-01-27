const MensDating = require("../Controller/mensDatingCtrl");
module.exports = (app) => {
  app.post("/mensDatingTemplate", MensDating.mensDatingTemplate);
  app.post("/updateMensDatingTemplate", MensDating.updateMensDatingTemplate);
  app.post("/mensdating", MensDating.deleteCompaign);
};
