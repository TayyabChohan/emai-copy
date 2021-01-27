const { Op } = require("sequelize");
const db = require("../Model/index");
const Template = db.template;
const PhysicalProduct = db.physicalProduct;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.physicalProductTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      PhysicalProduct.create({
        campaign_id: campainData.id,
        name: req.body.name,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_description: req.body.product_description,
        product_inventory: req.body.product_inventory,
        primary_problem: req.body.primary_problem,
        sales_link: req.body.sales_link,
        sale_price: req.body.sale_price,
        full_price: req.body.full_price,
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
                "#ProductDescription": req.body.product_description,
                "#ProductCategory": req.body.product_category,
                "#ProductName": req.body.product_name,
                "#PrimaryProblem<": req.body.primary_problem,
                "#ProductInventory": req.body.product_inventory,
                "#YourName": req.body.name,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#ProductDescription|#ProductCategory|#YourName|#Benefits|#ProductName|#PrimaryProblem|#ProductInventory/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarSalesLink">(.*?)<\/span>/g,
                '<span var="#VarSalesLink"><a href="' +
                  req.body.sales_link +
                  '" target="_blank">' +
                  req.body.sales_link +
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

exports.updatePhysicalProductTemplate = (req, res) => {
  PhysicalProduct.update(
    {
      name: req.body.name,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_description: req.body.product_description,
      product_inventory: req.body.product_inventory,
      primary_problem: req.body.primary_problem,
      sales_link: req.body.sales_link,
      sale_price: req.body.sale_price,
      full_price: req.body.full_price,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  PhysicalProduct.findOne({
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
          /<span var="#VarProductDescription">(.*?)<\/span>/g,
          '<span var="#VarProductDescription">' +
            req.body.product_description +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductCategory">(.*?)<\/span>/g,
          '<span var="#VarProductCategory">' +
            req.body.product_category +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarSalesLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarSalesLink"><a href="' +
            req.body.sales_link +
            '" target="_blank">' +
            req.body.sales_link +
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
          /<span var="#VarProductName">(.*?)<\/span>/g,
          '<span var="#VarProductName">' + req.body.product_name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarPrimaryProblem">(.*?)<\/span>/g,
          '<span var="#VarPrimaryProblem">' +
            req.body.primary_problem +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductInventory">(.*?)<\/span>/g,
          '<span var="#VarProductInventory">' +
            req.body.product_inventory +
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
  PhysicalProduct.findOne({
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
