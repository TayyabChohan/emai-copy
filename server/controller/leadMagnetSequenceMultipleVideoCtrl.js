const { Op } = require("sequelize");
const db = require("../Model/index");
const LmsSeries = db.lmsSeries;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.leadMagnetSequenceMultipleVideoTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      LmsSeries.create({
        campaign_id: campainData.id,
        name: req.body.name,
        lms_topic: req.body.lms_topic,
        lms_title: req.body.lms_title,
        lms_url: req.body.lms_url,
        lms_video_count: req.body.lms_video_count,
        lms_delivery: req.body.lms_delivery,
        lms_support_email: req.body.lms_support_email,
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
              let customEmailSubject = emailData[i].subject;
              let mapObj = {
                "#LmsTitle": req.body.lms_title,
                "#LmsTopic": req.body.lms_topic,
                "#LmsVideoCount": req.body.lms_video_count,
                "#LmsSupportEmail": req.body.lms_support_email,
                "#LmsDelivery": req.body.lms_delivery,
                "#YourName": req.body.name,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#LmsTitle|#LmsTopic|#LmsVideoCount|#LmsSupportEmail|#LmsDelivery|#YourName|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailSubject = customEmailSubject.replace(
                /#LmsTitle|#LmsTopic|#LmsURL|#LmsVideoCount|#LmsSupportEmail|#LmsDelivery|#YourName|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarLmsURL">(.*?)<\/span>/g,
                '<span var="#VarLmsURL"><a href="' +
                  req.body.lms_url +
                  '" target="_blank">' +
                  req.body.lms_url +
                  "</a></span>"
              );
              EmailCustom.create({
                subject: customEmailSubject,
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

exports.updateLeadMagnetSequenceMultipleVideoTemplate = (req, res) => {
  LmsSeries.update(
    {
      name: req.body.name,
      lms_topic: req.body.lms_topic,
      lms_title: req.body.lms_title,
      lms_url: req.body.lms_url,
      lms_video_count: req.body.lms_video_count,
      lms_delivery: req.body.lms_delivery,
      lms_support_email: req.body.lms_support_email,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  LmsSeries.findOne({
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
          /<span var="#VarLmsTitle">(.*?)<\/span>/g,
          '<span var="#VarLmsTitle">' + req.body.lms_title + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarLmsTopic">(.*?)<\/span>/g,
          '<span var="#VarLmsTopic">' + req.body.lms_topic + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarLmsURL"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarLmsURL"><a href="' +
            req.body.lms_url +
            '" target="_blank">' +
            req.body.lms_url +
            "</a></span>"
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
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarLmsVideoCount">(.*?)<\/span>/g,
          '<span var="#VarLmsVideoCount">' +
            req.body.lms_video_count +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarLmsDelivery">(.*?)<\/span>/g,
          '<span var="#VarLmsDelivery">' + req.body.lms_delivery + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarLmsSupportEmail">(.*?)<\/span>/g,
          '<span var="#VarLmsSupportEmail">' +
            req.body.lms_support_email +
            "</span>"
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
  LmsSeries.findOne({
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