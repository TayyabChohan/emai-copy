const { Op } = require("sequelize");
const db = require("../Model/index");
const FlasSAle = db.flasSAle;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.saveFlasSAletemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      FlasSAle.create({
        campaign_id: campainData.id,
        flash_sale_price: req.body.flash_sale_price,
        name: req.body.name,
        sales_page: req.body.sales_page,
        product_topic: req.body.product_topic,
        product_type: req.body.product_type,
        product_name: req.body.product_name,
        retail_price: req.body.retail_price,
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
                "#RetailPrice": req.body.retail_price,
                "#YourName": req.body.name,
                "#ProductName": req.body.product_name,
                "#ProductTopic": req.body.product_topic,
                "#ProductType": req.body.product_type,
                "#FlashSalePrice": req.body.flash_sale_price,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#RetailPrice|#YourName|#ProductName|#ProductTopic|#FlashSalePrice|#ProductType|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarSalesPage">(.*?)<\/span>/g,
                '<span var="#VarSalesPage"><a href="' +
                  req.body.sales_page +
                  '" target="_blank">' +
                  req.body.sales_page +
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

exports.updateFlasSAletemplate = (req, res) => {
  FlasSAle.update(
    {
      flash_sale_price: req.body.flash_sale_price,
      name: req.body.name,
      sales_page: req.body.sales_page,
      product_topic: req.body.product_topic,
      product_type: req.body.product_type,
      product_name: req.body.product_name,
      retail_price: req.body.retail_price,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  FlasSAle.findOne({
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
          /<span var="#VarSalesPage"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarSalesPage"><a href="' +
            req.body.sales_page +
            '" target="_blank">' +
            req.body.sales_page +
            "</a></span>"
        );
        mystring = mystring.replace(
          /<span var="#VarRetailPrice">(.*?)<\/span>/g,
          '<span var="#VarRetailPrice">' + req.body.retail_price + "</span>"
        );

        mystring = mystring.replace(
          /<span var="#VarYourName">(.*?)<\/span>/g,
          '<span var="#VarYourName">' + req.body.name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductName">(.*?)<\/span>/g,
          '<span var="#VarProductName">' + req.body.product_name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductTopic">(.*?)<\/span>/g,
          '<span var="#VarProductTopic">' + req.body.product_topic + "</span>"
        );

        mystring = mystring.replace(
          /<span var="#VarProductType">(.*?)<\/span>/g,
          '<span var="#VarProductType">' + req.body.product_type + "</span>"
        );

        mystring = mystring.replace(
          /<span var="#VarFlashSalePrice">(.*?)<\/span>/g,
          '<span var="#VarFlashSalePrice">' +
            req.body.flash_sale_price +
            "</span>"
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
  FlasSAle.findOne({
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

