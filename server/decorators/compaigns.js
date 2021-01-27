const Compaigns = require("../Controller/compaignCtrl");
module.exports = (app) => {
  app.post("/updateCampaignTitle", Compaigns.updateCampaignTitle);
  app.post("/getTemplateType", Compaigns.getTemplateType);
  app.post("/getAllCompaigns", Compaigns.getAllCompaigns);
  app.post("/getOneCompaigns", Compaigns.getOneCompaigns);
};
