const { Op } = require("sequelize");
const db = require("../Model/index");
const LmsVideo = db.lmsVideo;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.saveLmsVideoTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })

    .then((campainData) => {
      LmsVideo.create({
        campaign_id: campainData.id,
        lms_support_email: req.body.lms_support_email,
        name: req.body.name,
        lms_video_length: req.body.lms_video_length,
        lms_title: req.body.lms_title,
        lms_url: req.body.lms_url,
        lms_topic: req.body.lms_topic,
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
                "#LmsTopic": req.body.lms_Topic,
                "#YourName": req.body.name,
                "#LmsTitle": req.body.lms_title,
                "#LmsVideoLength": req.body.lms_video_length,
                "#LmsSupportEmail": req.body.lms_support_email,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#LmsTopic|#LmsTitle|#YourName|#LmsVideoLength|#Benefits|#LmsSupportEmail/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailSubject = customEmailSubject.replace(
                /#LmsTitle/gi,
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

exports.updateLmsVideoTemplate = (req, res) => {
  LmsVideo.update(
    {
      lms_support_email: req.body.lms_support_email,
      name: req.body.name,
      lms_video_length: req.body.lms_video_length,
      lms_title: req.body.lms_title,
      lms_url: req.body.lms_url,
      lms_topic: req.body.lms_topic,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  LmsVideo.findOne({
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
          /<span var="#VarLmsVideoLength">(.*?)<\/span>/g,
          '<span var="#VarLmsVideoLength">' +
            req.body.lms_video_length +
            "</span>"
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
  LmsVideo.findOne({
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

