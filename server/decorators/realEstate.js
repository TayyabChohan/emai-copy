const RealEstate = require("../Controller/realEstateCtrl");
module.exports = (app) => {
  app.post("/saveRealEstateForm", RealEstate.saveRealEstatetemplate);
  app.post("/updateRealEstatetemplate", RealEstate.updateRealEstatetemplate);
  app.post("/realestate", RealEstate.deleteCompaign);
};
