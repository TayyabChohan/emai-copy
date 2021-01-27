const customizeEmail = require("../Controller/customizeEmailCtrl");
module.exports = (app) => {
  app.post("/updateEmail", customizeEmail.updateEmail);
};
