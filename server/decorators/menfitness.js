const Menfitness = require("../Controller/menfitnessCtrl");
module.exports = (app) => {
  app.post("/saveMenFitnessForm", Menfitness.saveMenfitnessTemplate);
  app.post("/updateMenfitnessTemplate", Menfitness.updateMenfitnessTemplate);
  app.post("/menfitness", Menfitness.deleteCompaign);
};
