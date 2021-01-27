const Survey = require("../Controller/surveyTemplate_c");
module.exports = (app) => {
  app.post("/surveyTemplate", Survey.surveyTemplate);
  app.post("/updateSurveyTemplate", Survey.updateSurveyTemplate);
  app.post("/surveysequence", Survey.deleteCompaign);
};
