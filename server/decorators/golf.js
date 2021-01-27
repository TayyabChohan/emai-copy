const Golf = require("../Controller/golfCtrl");
module.exports = (app) => {
  app.post("/golfTemplate", Golf.golfTemplate);
  app.post("/updateGolfTemplate", Golf.updateGolfTemplate);
  app.post("/golf", Golf.deleteCompaign);
};
