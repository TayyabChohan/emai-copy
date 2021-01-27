const Drawing = require("../Controller/drawingCtrl");
module.exports = (app) => {
  app.post("/drawingTemplate", Drawing.drawingTemplate);
  app.post("/updateDrawingTemplate", Drawing.updateDrawingTemplate);
  app.post("/drawing", Drawing.deleteCompaign);
};
