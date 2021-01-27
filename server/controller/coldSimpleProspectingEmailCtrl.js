const db = require("../Model/index");
const ColdProspecting = db.coldProspecting;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.coldSimpleProspectingEmailTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      ColdProspecting.create({
        campaign_id: campainData.id,
        name: req.body.name,
        phone_number: req.body.phone_number,
        website_url: req.body.website_url,
        prospect_goal: req.body.prospect_goal,
        prospect_model: req.body.prospect_model,
      }).then((result) => {
        Email.findAll({
          where: {
            template_id: req.body.template_id,
          },
        })
          .then((emailData) => {
            for (let i = 0; i < emailData.length; i++) {
              let customEmailBody = emailData[i].body;
              let mapObj = {
                "#ProspectModel": req.body.prospect_model,
                "#ProspectGoal": req.body.prospect_goal,
                "#PhoneNumber": req.body.phone_number,
                "#WebsiteURL": req.body.website_url,
                "#YourName": req.body.name,
              };
              customEmailBody = customEmailBody.replace(
                /#ProspectModel|#ProspectGoal|#YourName|#PhoneNumber|#WebsiteURL/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarWebsiteURL">(.*?)<\/span>/g,
                '<span var="#VarWebsiteURL"><a href="' +
                  req.body.website_url +
                  '" target="_blank">' +
                  req.body.website_url +
                  "</a></span>"
              );
              EmailCustom.create({
                subject: emailData[i].subject,
                body: customEmailBody,
                affiliate_link: emailData[i].affiliate_link,
                emails_default_id: emailData[i].id,
                tenant_id: req.body.tenant_id,
                campaign_id: campainData.id,
              });
            }
          })
          .then(() => {
            res.send({
              success: true,
              err: null,
              values: {
                compaignID: campainData.id,
                msg: "Successfully Added Template",
              },
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Adding Template.",
      });
    });
};

exports.updateColdSimpleProspectingEmailTemplate = (req, res) => {
  ColdProspecting.update(
    {
      phone_number: req.body.phone_number,
      name: req.body.name,
      website_url: req.body.website_url,
      prospect_goal: req.body.prospect_goal,
      prospect_model: req.body.prospect_model,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  EmailCustom.findAll({
    where: {
      campaign_id: req.body.campaign_id,
    },
  })
    .then((emailData) => {
      let mystring;
      for (let i = 0; i < emailData.length; i++) {
        mystring = emailData[i].body;
        mystring = mystring.replace(
          /<span var="#VarProspectModel">(.*?)<\/span>/g,
          '<span var="#VarProspectModel">' + req.body.prospect_model + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProspectGoal">(.*?)<\/span>/g,
          '<span var="#VarProspectGoal">' + req.body.prospect_goal + "</span>"
        );

        mystring = mystring.replace(
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarWebsiteURL"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarWebsiteURL"><a href="' +
            req.body.website_url +
            '" target="_blank">' +
            req.body.website_url +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarPhoneNumber">(.*?)<\/span>/g,
          '<span var="#VarPhoneNumber">' + req.body.phone_number + "</span>"
        );

        EmailCustom.update(
          {
            body: mystring,
          },
          { where: { id: emailData[i].id } }
        );
      }
      res.send({
        success: true,
        err: null,
        value: {
          msg: "Successfully Updated Campaign",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while Fetching Emails.",
      });
    });
};
exports.deleteCompaign = (req, res) => {
  Campaign.destroy({
    where: { id: req.body.campaign_id },
  })
    .then(() => {
      res.send({
        success: true,
        err: null,
        msg: "Successfully Deleted Campaign",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while Fetching Emails.",
      });
    });
};


