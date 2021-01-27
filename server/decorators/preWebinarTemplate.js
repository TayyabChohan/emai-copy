const PreWebinarEmail = require("../Controller/preWebinarTemplate_c");
module.exports = (app) => {
  app.post("/preWebinarTemplate", PreWebinarEmail.preWebinarTemplate);
  app.post(
    "/updatePreWebinarTemplate",
    PreWebinarEmail.updatePreWebinarTemplate
  );
  app.post("/prewebinaremail", PreWebinarEmail.deleteCompaign);
};
