const Email = require("../Controller/emailViewC");
module.exports = (app) => {
  app.post("/getEmail", Email.getAllPersonas);
};
