const BloggerOutreach = require("../Controller/bloggerOutreachCtrl");

module.exports = (app) => {
  app.post("/bloggerOutreachTemplate", BloggerOutreach.bloggerOutreachTemplate);
  app.post(
    "/updateBloggerOutreachTemplate",
    BloggerOutreach.updateBloggerOutreachTemplate
  );
  app.post(
    "/bloggeroutreach",
    BloggerOutreach.deleteCompaign
  );
};
