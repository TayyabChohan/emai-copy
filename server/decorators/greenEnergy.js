const GreenEnergy = require("../Controller/greenEnergyCtrl");
module.exports = (app) => {
  app.post("/greenEnergyTemplate", GreenEnergy.greenEnergyTemplate);
  app.post("/updateGreenEnergyTemplate", GreenEnergy.updateGreenEnergyTemplate);
  app.post("/greenenergy", GreenEnergy.deleteCompaign);
};
