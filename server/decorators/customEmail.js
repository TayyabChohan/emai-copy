const CustomEmails = require("../Controller/customEmail_c");
module.exports = (app) => {
  app.post("/selectEmailsCustom", CustomEmails.selectEmailsCustom);
  app.get("/downloadEmailsCustom", CustomEmails.downloadEmailsCustom);
};
