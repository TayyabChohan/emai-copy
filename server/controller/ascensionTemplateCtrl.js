const { Op } = require("sequelize");
const db = require("../Model/index");
const Ascension = db.ascension;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.ascensionSeriesTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      Ascension.create({
        campaign_id: campainData.id,
        name: req.body.name,
        product_name: req.body.product_name,
        product_link: req.body.product_link,
        support_link: req.body.support_link,
        upsell_product: req.body.upsell_product,
        upsell_topic: req.body.upsell_topic,
        upsell_sale_price: req.body.upsell_sale_price,
        upsell_normal_price: req.body.upsell_normal_price,
        upsell_link: req.body.upsell_link,
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
                "#ProductName": req.body.product_name,
                "#UpsellTopic": req.body.upsell_topic,
                "#UpsellNormalPrice": req.body.upsell_normal_price,
                "#UpsellSalePrice": req.body.upsell_sale_price,
                "#YourName": req.body.name,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#ProductName|#UpsellTopic|#UpsellNormalPrice|#UpsellSalePrice|#YourName|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarProductLink">(.*?)<\/span>/g,
                '<span var="#VarProductLink"><a href="' +
                  req.body.product_link +
                  '" target="_blank">' +
                  req.body.product_link +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarUpsellLink">(.*?)<\/span>/g,
                '<span var="#VarUpsellLink"><a href="' +
                  req.body.upsell_link +
                  '" target="_blank">' +
                  req.body.upsell_link +
                  "</a></span>"
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarSupportLink">(.*?)<\/span>/g,
                '<span var="#VarSupportLink"><a href="' +
                  req.body.support_link +
                  '" target="_blank">' +
                  req.body.support_link +
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

exports.updateAscensionSeriesTemplate = (req, res) => {
  Ascension.update(
    {
      product_name: req.body.product_name,
      name: req.body.name,
      product_link: req.body.product_link,
      support_link: req.body.support_link,
      upsell_product: req.body.upsell_product,
      upsell_topic: req.body.upsell_topic,
      upsell_sale_price: req.body.upsell_sale_price,
      upsell_normal_price: req.body.upsell_normal_price,
      upsell_link: req.body.upsell_link,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  Ascension.findOne({
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
          /<span var="#VarUpsellTopic">(.*?)<\/span>/g,
          '<span var="#VarUpsellTopic">' + req.body.upsell_topic + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarUpsellSalePrice">(.*?)<\/span>/g,
          '<span var="#VarUpsellSalePrice">' +
            req.body.upsell_sale_price +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarProductLink"><a href="' +
            req.body.product_link +
            '" target="_blank">' +
            req.body.product_link +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductName">(.*?)<\/span>/g,
          '<span var="#VarProductName">' + req.body.product_name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarSupportLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarSupportLink"><a href="' +
            req.body.support_link +
            '" target="_blank">' +
            req.body.support_link +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarUpsellLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarUpsellLink"><a href="' +
            req.body.upsell_link +
            '" target="_blank">' +
            req.body.upsell_link +
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
  Ascension.findOne({
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
