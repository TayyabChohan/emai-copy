const db = require("../Model/index");
const Survey = db.survey;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.surveyTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      Survey.create({
        campaign_id: campainData.id,
        name: req.body.name,
        survey_link: req.body.survey_link,
        results_link: req.body.results_link,
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
                "#YourName": req.body.name,
              };
              customEmailBody = customEmailBody.replace(
                /#YourName/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarSurveyLink">(.*?)<\/span>/g,
                '<span var="#VarSurveyLink"><a href="' +
                  req.body.survey_link +
                  '" target="_blank">' +
                  req.body.survey_link +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarResultsLink">(.*?)<\/span>/g,
                '<span var="#VarResultsLink"><a href="' +
                  req.body.results_link +
                  '" target="_blank">' +
                  req.body.results_link +
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

exports.updateSurveyTemplate = (req, res) => {
  Survey.update(
    {
      name: req.body.name,
      survey_link: req.body.survey_link,
      results_link: req.body.results_link,
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
          /<span var="#VarSurveyLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarSurveyLink"><a href="' +
            req.body.survey_link +
            '" target="_blank">' +
            req.body.survey_link +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarResultsLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarResultsLink"><a href="' +
            req.body.results_link +
            '" target="_blank">' +
            req.body.results_link +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
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
