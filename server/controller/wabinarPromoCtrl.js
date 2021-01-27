const { Op } = require("sequelize");
const db = require("../Model/index");
const WebinarPromo = db.webinarPromo;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.saveWabinarPromomplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      WebinarPromo.create({
        campaign_id: campainData.id,
        host: req.body.host,
        name: req.body.name,
        topic: req.body.topic,
        link: req.body.link,
        date: req.body.date,
        day: req.body.day,
        time: req.body.time,
      }).then((result) => {
        for (let i = 0; i < req.body.benefits.length; i++) {
          TemplateBenifit.create({
            ref_id: result.id,
            benefit: req.body.benefits[i],
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
                "#YourName": req.body.name,
                "#WebinarTopic": req.body.topic,
                "#WebinarTime": req.body.time,
                "#WebinarBenefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#YourName|#WebinarTopic|#WebinarTime|#WebinarBenefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarWebinarLink">(.*?)<\/span>/g,
                '<span var="#VarWebinarLink"><a href="' +
                  req.body.link +
                  '" target="_blank">' +
                  req.body.link +
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

exports.updateWabinarPromomplate = (req, res) => {
  WebinarPromo.update(
    {
      host: req.body.host,
      name: req.body.name,
      topic: req.body.topic,
      link: req.body.link,
      date: req.body.date,
      day: req.body.day,
      time: req.body.time,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  WebinarPromo.findOne({
    where: { campaign_id: req.body.campaign_id },
  }).then((result) => {
    TemplateBenifit.destroy({
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
          /<span var="#VarWebinarLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarWebinarLink"><a href="' +
            req.body.link +
            '" target="_blank">' +
            req.body.link +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarWebinarTopic">(.*?)<\/span>/g,
          '<span var="#VarWebinarTopic">' + req.body.topic + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarWebinarBenefits">(.*?)<\/span>/g,
          '<span var="#VarWebinarBenefits">' +
            "<ul><li>" +
            req.body.benefits.toString().split(",").join("</li><li>") +
            "</li></ul>" +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarWebinarTime">(.*?)<\/span>/g,
          '<span var="#VarWebinarTime">' + req.body.time + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.host + "</span>"
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
  WebinarPromo.findOne({
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



