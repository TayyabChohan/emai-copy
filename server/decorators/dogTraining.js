const DogTraining = require("../Controller/dogTrainingCtrl");
module.exports = (app) => {
  app.post("/saveDogTrainingForm", DogTraining.saveDogTrainingTemplate);
  app.post("/updateDogTrainingTemplate", DogTraining.updateDogTrainingTemplate);
  app.post("/dogtraining", DogTraining.deleteCompaign);
};
