const Survey = require("../Controller/directRevenuetemplateCtrl");
module.exports = (app) => {
  app.post("/saveDirectRevenueForm", Survey.directRevenuetemplate);
  app.post("/updateDirectRevenuetemplate", Survey.updateDirectRevenuetemplate);
  app.post("/directrevenue", Survey.deleteCompaign);
};
