const { Op } = require("sequelize");
const db = require("../Model/index");
const DirectRevenue = db.directRevenue;
const TemplateBenifit = db.templateBenifits;
const TemplateQuestion = db.templatequestions;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.directRevenuetemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      DirectRevenue.create({
        campaign_id: campainData.id,
        name: req.body.name,
        email: req.body.email,
        general_topic: req.body.general_topic,
        ideal_client: req.body.ideal_client,
        investment: req.body.investment,
      }).then((result) => {
        for (let i = 0; i < req.body.benefits.length; i++) {
          TemplateBenifit.create({
            ref_id: result.id,
            benefit: req.body.benefits[i],
            template: req.body.templateCode,
          });
        }
        for (let j = 0; j < req.body.questions.length; j++) {
          TemplateQuestion.create({
            ref_id: result.id,
            question: req.body.questions[j],
            template: req.body.templateCode,
          });
        }
        Email.findAll({
          where: {
            template_id: req.body.template_id,
          },
        })
          .then((emailData) => {
            for (let i = 0; i < emailData.length; i++) {
              let customEmailBody = emailData[i].body;
              let mapObj = {
                "#GeneralTopic": req.body.general_topic,
                "#Investment": req.body.investment,
                "#YourEmail": req.body.email,
                "#IdealClient": req.body.ideal_client,
                "#YourName": req.body.name,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
                "#Questions":
                  "<ul><li>" +
                  req.body.questions.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#GeneralTopic|#Investment|#YourEmail|#IdealClient|#Benefits|#YourName|#Questions/gi,
                function (matched) {
                  return mapObj[matched];
                }
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

exports.updateDirectRevenuetemplate = (req, res) => {
  DirectRevenue.update(
    {
      name: req.body.name,
      email: req.body.email,
      general_topic: req.body.general_topic,
      ideal_client: req.body.ideal_client,
      investment: req.body.investment,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  DirectRevenue.findOne({
    where: { campaign_id: req.body.campaign_id },
  }).then((result) => {
    TemplateBenifit.destroy({
      where: {
        [Op.and]: [{ ref_id: result.id }, { template: req.body.templateCode }],
      },
    });
    TemplateQuestion.destroy({
      where: {
        [Op.and]: [{ ref_id: result.id }, { template: req.body.templateCode }],
      },
    });
    for (let i = 0; i < req.body.benefits.length; i++) {
      TemplateBenifit.create({
        ref_id: result.id,
        benefit: req.body.benefits[i],
        template: req.body.templateCode,
      });
    }
    for (let i = 0; i < req.body.questions.length; i++) {
      TemplateQuestion.create({
        ref_id: result.id,
        question: req.body.questions[i],
        template: req.body.templateCode,
      });
    }
  });
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
          /<span var="#VarGeneralTopic">(.*?)<\/span>/g,
          '<span var="#VarGeneralTopic">' + req.body.general_topic + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarInvestment">(.*?)<\/span>/g,
          '<span var="#VarInvestment">' + req.body.investment + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarBenefits">(.*?)<\/span>/g,
          '<span var="#VarBenefits">' +
            "<ul><li>" +
            req.body.benefits.toString().split(",").join("</li><li>") +
            "</li></ul>" +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarQuestions">(.*?)<\/span>/g,
          '<span var="#VarQuestions">' +
            "<ul><li>" +
            req.body.questions.toString().split(",").join("</li><li>") +
            "</li></ul>" +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarYourEmail">(.*?)<\/span>/g,
          '<span var="#VarYourEmail">' + req.body.email + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarIdealClient">(.*?)<\/span>/g,
          '<span var="#VarIdealClient">' + req.body.ideal_client + "</span>"
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
  let ID;
  DirectRevenue.findOne({
    where: { campaign_id: req.body.campaign_id },
    attributes: ["id"],
  })
    .then((TemplateID) => {
      ID = TemplateID.id;
    })
    .then(() => {
      TemplateBenifit.destroy({
        where: {
          [Op.and]: [{ ref_id: ID }, { template: req.body.code }],
        },
      });
    })
    .then(() => {
      Campaign.destroy({
        where: { id: req.body.campaign_id },
      });
      res.send({
        success: true,
        err: null,
        msg: "Successfully Deleted Campaign",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Fetching Emails.",
      });
    });
};
