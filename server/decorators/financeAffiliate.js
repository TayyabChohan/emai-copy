const Finance = require("../Controller/financCtrl");
module.exports = (app) => {
  app.post("/saveFinanceForm", Finance.saveFinanceTemplate);
  app.post("/updateFinanceTemplate", Finance.updateFinanceTemplate);
  app.post("/finance", Finance.deleteCompaign);
};
