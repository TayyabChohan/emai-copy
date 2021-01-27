const { Op } = require("sequelize");
const db = require("../Model/index");
const Relaunch = db.relaunch;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.waitingListRelaunchTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      Relaunch.create({
        campaign_id: campainData.id,
        name: req.body.name,
        product_name: req.body.product_name,
        next_launch: req.body.next_launch,
        relaunch_link: req.body.relaunch_link,
      }).then((result) => {
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
                "#ProductName": req.body.product_name,
                "#NextLaunch": req.body.next_launch,
                "#YourName": req.body.name,
              };
              customEmailBody = customEmailBody.replace(
                /#ProductName|#NextLaunch|#YourName/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailSubject = customEmailSubject.replace(
                /#ProductName|#NextLaunch|#YourName|#RelaunchLink/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarRelaunchLink">(.*?)<\/span>/g,
                '<span var="#VarRelaunchLink"><a href="' +
                  req.body.relaunch_link +
                  '" target="_blank">' +
                  req.body.relaunch_link +
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

exports.updateWaitingListRelaunchTemplate = (req, res) => {
  Relaunch.update(
    {
      name: req.body.name,
      product_name: req.body.product_name,
      next_launch: req.body.next_launch,
      relaunch_link: req.body.relaunch_link,
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
          /<span var="#VarProductName">(.*?)<\/span>/g,
          '<span var="#VarProductName">' + req.body.product_name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarNextLaunch">(.*?)<\/span>/g,
          '<span var="#VarNextLaunch">' + req.body.next_launch + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarRelaunchLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarRelaunchLink"><a href="' +
            req.body.relaunch_link +
            '" target="_blank">' +
            req.body.relaunch_link +
            "</a></span>"
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
        message: err.message || "Some error occurred while Fetching Emails.",
      });
    });
};
