const { Op } = require("sequelize");
const db = require("../Model/index");
const SalesLetterPromo = db.salesLetterPromo;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.SalesLetterPromoTemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })
    .then((campainData) => {
      SalesLetterPromo.create({
        campaign_id: campainData.id,
        name: req.body.name,
        product_name: req.body.product_name,
        product_topic: req.body.product_topic,
        sales_link: req.body.sales_link,
        core_desire: req.body.core_desire,
        testimonial_quote: req.body.testimonial_quote,
        testimonial_sender: req.body.testimonial_sender,
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
                "#CoreDesire": req.body.core_desire,
                "#ProductName": req.body.product_name,
                "#ProductTopic": req.body.product_topic,
                "#TestimonialSender": req.body.testimonial_sender,
                "#TestimonialQuote": req.body.testimonial_quote,
                "#YourName": req.body.name,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#CoreDesire|#ProductName|#ProductTopic|#TestimonialSender|#TestimonialQuote|#YourName|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailSubject = customEmailSubject.replace(
                /#CoreDesire|#ProductSalesPageLink|#ProductName|#ProductTopic|#TestimonialSender|#TestimonialQuote|#YourName|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarProductSalesPageLink">(.*?)<\/span>/g,
                '<span var="#VarProductSalesPageLink"><a href="' +
                  req.body.sales_link +
                  '" target="_blank">' +
                  req.body.sales_link +
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

exports.updateSalesLetterPromoTemplate = (req, res) => {
  SalesLetterPromo.update(
    {
      name: req.body.name,
      product_name: req.body.product_name,
      product_topic: req.body.product_topic,
      sales_link: req.body.sales_link,
      core_desire: req.body.core_desire,
      testimonial_quote: req.body.testimonial_quote,
      testimonial_sender: req.body.testimonial_sender,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  SalesLetterPromo.findOne({
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
          /<span var="#VarCoreDesire">(.*?)<\/span>/g,
          '<span var="#VarCoreDesire">' + req.body.core_desire + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductName">(.*?)<\/span>/g,
          '<span var="#VarProductName">' + req.body.product_name + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductSalesPageLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarProductSalesPageLink"><a href="' +
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
          /<span var="#VarProductTopic">(.*?)<\/span>/g,
          '<span var="#VarProductTopic">' + req.body.product_topic + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarTestimonialSender">(.*?)<\/span>/g,
          '<span var="#VarTestimonialSender">' +
            req.body.testimonial_sender +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarTestimonialQuote">(.*?)<\/span>/g,
          '<span var="#VarTestimonialQuote">' +
            req.body.testimonial_quote +
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
  SalesLetterPromo.findOne({
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

