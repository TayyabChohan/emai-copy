const db = require("../Model/index");
const FinanceAffiliate = db.financeAffiliate;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.saveFinanceTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      FinanceAffiliate.create({
        campaign_id: campainData.id,
        name: req.body.name,
        clickbank_id: req.body.clickbank_id,
      }).then(() => {
        Email.findAll({
          where: {
            template_id: req.body.template_id,
          },
        })
          .then((emailData) => {
            for (let i = 0; i < emailData.length; i++) {
              let customEmailBody = emailData[i].body;
              let mapObj = {
                "#ClickbankID": req.body.clickbank_id,
                "#YourName": req.body.name,
              };
              customEmailBody = customEmailBody.replace(
                /#ClickbankID|#YourName/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              let affiliateLink = emailData[i].affiliate_link;
              affiliateLink = affiliateLink.replace(
                /#ClickbankID|#YourName/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              EmailCustom.create({
                subject: emailData[i].subject,
                body: customEmailBody,
                affiliate_link: affiliateLink,
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

exports.updateFinanceTemplate = (req, res) => {
  FinanceAffiliate.update(
    {
      name: req.body.name,
      clickbank_id: req.body.clickbank_id,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  EmailCustom.findAll({
    where: {
      campaign_id: req.body.campaign_id,
    },
  })
    .then((emailData) => {
      let mystring, affiliateLink;
      for (let i = 0; i < emailData.length; i++) {
        mystring = emailData[i].body;
        affiliateLink = emailData[i].affiliate_link;
        affiliateLink = affiliateLink.replace(
          /\/\/(.+?)\.(.+?)\.hop\.clickbank\.net/g,
          "//" + req.body.clickbank_id + "." + "$2.hop.clickbank.net"
        );
        mystring = mystring.replace(
          /\/\/(.+?)\.(.+?)\.hop\.clickbank\.net/g,
          "//" + req.body.clickbank_id + "." + "$2.hop.clickbank.net"
        );
        mystring = mystring.replace(
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
        );
        EmailCustom.update(
          {
            body: mystring,
            affiliate_link: affiliateLink,
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
