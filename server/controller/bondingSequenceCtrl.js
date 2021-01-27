const { Op } = require("sequelize");
const db = require("../Model/index");
const Bonding = db.bonding;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.bondingSequenceTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      Bonding.create({
        campaign_id: campainData.id,
        name: req.body.name,
        download_type: req.body.download_type,
        download_name: req.body.download_name,
        download_link: req.body.download_link,
        website_url: req.body.website_url,
        contact_url: req.body.contact_url,
        support_url: req.body.support_url,
        facebook_url: req.body.facebook_url,
        twitter_url: req.body.twitter_url,
        youtube_url: req.body.youtube_url,
        linkedin_url: req.body.linkedin_url,
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
                "#DownloadType": req.body.download_type,
                "#DownloadName": req.body.download_name,
                "#YourName": req.body.name,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#DownloadType|#DownloadName|#YourName|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailSubject = customEmailSubject.replace(
                /#DownloadType|#DownloadName|#YourName|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarDownloadLink">(.*?)<\/span>/g,
                '<span var="#VarDownloadLink"><a href="' +
                  req.body.download_link +
                  '" target="_blank">' +
                  req.body.download_link +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarSupportUrl">(.*?)<\/span>/g,
                '<span var="#VarSupportUrl"><a href="' +
                  req.body.support_url +
                  '" target="_blank">' +
                  req.body.support_url +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarFacebookUrl">(.*?)<\/span>/g,
                '<span var="#VarFacebookUrl"><a href="' +
                  req.body.facebook_url +
                  '" target="_blank">' +
                  req.body.facebook_url +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarTwitterUrl">(.*?)<\/span>/g,
                '<span var="#VarTwitterUrl"><a href="' +
                  req.body.twitter_url +
                  '" target="_blank">' +
                  req.body.twitter_url +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarYoutubeUrl">(.*?)<\/span>/g,
                '<span var="#VarYoutubeUrl"><a href="' +
                  req.body.youtube_url +
                  '" target="_blank">' +
                  req.body.youtube_url +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarLinkedinUrl">(.*?)<\/span>/g,
                '<span var="#VarLinkedinUrl"><a href="' +
                  req.body.linkedin_url +
                  '" target="_blank">' +
                  req.body.linkedin_url +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarWebsiteUrl">(.*?)<\/span>/g,
                '<span var="#VarWebsiteUrl"><a href="' +
                  req.body.website_url +
                  '" target="_blank">' +
                  req.body.website_url +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarContactUrl">(.*?)<\/span>/g,
                '<span var="#VarContactUrl"><a href="' +
                  req.body.contact_url +
                  '" target="_blank">' +
                  req.body.contact_url +
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

exports.updateBondingSequenceTemplate = (req, res) => {
  Bonding.update(
    {
      name: req.body.name,
      download_type: req.body.download_type,
      download_name: req.body.download_name,
      download_link: req.body.download_link,
      website_url: req.body.website_url,
      contact_url: req.body.contact_url,
      support_url: req.body.support_url,
      facebook_url: req.body.facebook_url,
      twitter_url: req.body.twitter_url,
      youtube_url: req.body.youtube_url,
      linkedin_url: req.body.linkedin_url,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  Bonding.findOne({
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
          /<span var="#VarDownloadLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarDownloadLink"><a href="' +
            req.body.download_link +
            '" target="_blank">' +
            req.body.download_link +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarDownloadType">(.*?)<\/span>/g,
          '<span var="#VarDownloadType">' + req.body.download_type + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarDownloadName">(.*?)<\/span>/g,
          '<span var="#VarDownloadName">' + req.body.download_name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarSupportUrl"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarSupportUrl"><a href="' +
            req.body.support_url +
            '" target="_blank">' +
            req.body.support_url +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarFacebookUrl"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarFacebookUrl"><a href="' +
            req.body.facebook_url +
            '" target="_blank">' +
            req.body.facebook_url +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarTwitterUrl"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarTwitterUrl"><a href="' +
            req.body.twitter_url +
            '" target="_blank">' +
            req.body.twitter_url +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarYoutubeUrl"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarYoutubeUrl"><a href="' +
            req.body.youtube_url +
            '" target="_blank">' +
            req.body.youtube_url +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarLinkedinUrl"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarLinkedinUrl"><a href="' +
            req.body.linkedin_url +
            '" target="_blank">' +
            req.body.linkedin_url +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarWebsiteUrl"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarWebsiteUrl"><a href="' +
            req.body.website_url +
            '" target="_blank">' +
            req.body.website_url +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarContactUrl"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarContactUrl"><a href="' +
            req.body.contact_url +
            '" target="_blank">' +
            req.body.contact_url +
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
  Bonding.findOne({
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