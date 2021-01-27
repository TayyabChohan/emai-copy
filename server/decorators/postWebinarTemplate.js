const PostWebinarEmail = require("../Controller/postWebinarTemplate_c");
module.exports = (app) => {
  app.post("/postWebinarTemplate", PostWebinarEmail.postWebinarTemplate);
  app.post(
    "/updatePostWebinarTemplate",
    PostWebinarEmail.updatePostWebinarTemplate
  );
  app.post("/postwebinaremail", PostWebinarEmail.deleteCompaign);
};
