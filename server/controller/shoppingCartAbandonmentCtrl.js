const { Op } = require("sequelize");
const db = require("../Model/index");
const ShoppingCartAbandonment = db.cartabdn;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.shoppingCartAbandonmentTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      ShoppingCartAbandonment.create({
        campaign_id: campainData.id,
        name: req.body.name,
        order_link: req.body.order_link,
        product_name: req.body.product_name,
        support_url: req.body.support_url,
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
                "#ProductName": req.body.product_name,
                "#YourName": req.body.name,
              };
              customEmailBody = customEmailBody.replace(
                /#ProductName|#YourName/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarOrderLink">(.*?)<\/span>/g,
                '<span var="#VarOrderLink"><a href="' +
                  req.body.order_link +
                  '" target="_blank">' +
                  req.body.order_link +
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

exports.updateShoppingCartAbandonmentTemplate = (req, res) => {
  ShoppingCartAbandonment.update(
    {
      name: req.body.name,
      order_link: req.body.order_link,
      product_name: req.body.product_name,
      support_url: req.body.support_url,
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
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
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
          /<span var="#VarOrderLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarOrderLink"><a href="' +
            req.body.order_link +
            '" target="_blank">' +
            req.body.order_link +
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
