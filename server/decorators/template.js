const Template = require("../Controller/templateCtrl");
module.exports = (app) => {
  app.get("/getTemplates", Template.findAll);
  app.post("/templateQuestionsData", Template.templateQuestionsData);
};
