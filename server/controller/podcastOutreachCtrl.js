const { Op } = require("sequelize");
const db = require("../Model/index");
const PodcastOutreach = db.podcastOutreach;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.podcastOutreachTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      PodcastOutreach.create({
        campaign_id: campainData.id,
        name: req.body.name,
        niche: req.body.niche,
        product_type: req.body.product_type,
        product_name: req.body.product_name,
        product_url: req.body.product_url,
        product_description: req.body.product_description,
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
                "#ProductType": req.body.product_type,
                "#ProductName": req.body.product_name,
                "#ProductDescription": req.body.product_description,
                "#YourNiche": req.body.niche,
                "#YourName": req.body.name,
              };
              customEmailBody = customEmailBody.replace(
                /#ProductType|#ProductName|#ProductDescription|#YourNiche|#YourName/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarProductURL">(.*?)<\/span>/g,
                '<span var="#VarProductURL"><a href="' +
                  req.body.product_url +
                  '" target="_blank">' +
                  req.body.product_url +
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

exports.updatePodcastOutreachTemplate = (req, res) => {
  PodcastOutreach.update(
    {
      name: req.body.name,
      niche: req.body.niche,
      product_type: req.body.product_type,
      product_name: req.body.product_name,
      product_url: req.body.product_url,
      product_description: req.body.product_description,
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
          /<span var="#VarProductType">(.*?)<\/span>/g,
          '<span var="#VarProductType">' + req.body.product_type + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductName">(.*?)<\/span>/g,
          '<span var="#VarProductName">' + req.body.product_name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductURL"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarProductURL"><a href="' +
            req.body.product_url +
            '" target="_blank">' +
            req.body.product_url +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductDescription">(.*?)<\/span>/g,
          '<span var="#VarProductDescription">' +
            req.body.product_description +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarYourNiche">(.*?)<\/span>/g,
          '<span var="#VarYourNiche">' + req.body.niche + "</span>"
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
