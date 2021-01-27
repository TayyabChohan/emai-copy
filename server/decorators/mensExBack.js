const MensExBack = require("../Controller/mensExBackCtrl");
module.exports = (app) => {
  app.post("/mensExBackTemplate", MensExBack.mensExBackTemplate);
  app.post("/updateMensExBackTemplate", MensExBack.updateMensExBackTemplate);
  app.post("/mensexback", MensExBack.deleteCompaign);
};
