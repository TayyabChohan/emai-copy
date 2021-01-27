const BlogSequence = require("../Controller/blogSequenceCtrl");

module.exports = (app) => {
  app.post("/saveBlogSequenceForm", BlogSequence.saveblogSequencetemplate);
  app.post(
    "/updateBlogSequencetemplate",
    BlogSequence.updateBlogSequencetemplate
  );
  app.post(
    "/blogsequence",
    BlogSequence.deleteCompaign
  );
};
