const { Op } = require("sequelize");
const db = require("../Model/index");
const FreeShipping = db.freeShipping;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.saveFreeShippingtemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })

    .then((campainData) => {
      FreeShipping.create({
        campaign_id: campainData.id,
        host: req.body.host,
        name: req.body.name,
        topic: req.body.topic,
        type: req.body.type,
        link: req.body.link,
        inventory: req.body.inventory,
        main_goal: req.body.main_goal,
        high_ticket_type: req.body.high_ticket_type,
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
                "#YourName": req.body.name,
                "#ProductType": req.body.type,
                "#ProductName": req.body.host,
                "#ProductTopic": req.body.topic,
                "#ProductLink": req.body.link,
                "#BuyerMainGoal": req.body.main_goal,
                "#HighTicketProductType": req.body.high_ticket_type,
                "#ProductInventory": req.body.inventory,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#YourName|#ProductType|#ProductName|#ProductTopic|#ProductInventory|#Benefits|#BuyerMainGoal|#HighTicketProductType/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailSubject = customEmailSubject.replace(
                /#YourName|#ProductType|#ProductName|#ProductTopic|#ProductLink|#ProductInventory|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarProductLink">(.*?)<\/span>/g,
                '<span var="#VarProductLink"><a href="' +
                  req.body.link +
                  '" target="_blank">' +
                  req.body.link +
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

exports.updateFreeShippingtemplate = (req, res) => {
  FreeShipping.update(
    {
      host: req.body.host,
      name: req.body.name,
      topic: req.body.topic,
      link: req.body.link,
      type: req.body.type,
      inventory: req.body.inventory,
      main_goal: req.body.main_goal,
      high_ticket_type: req.body.high_ticket_type,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  FreeShipping.findOne({
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
          /<span var="#VarProductInventory">(.*?)<\/span>/g,
          '<span var="#VarProductInventory">' + req.body.inventory + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductName">(.*?)<\/span>/g,
          '<span var="#VarProductName">' + req.body.host + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductType">(.*?)<\/span>/g,
          '<span var="#VarProductType">' + req.body.type + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductTopic">(.*?)<\/span>/g,
          '<span var="#VarProductTopic">' + req.body.topic + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarProductLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarProductLink"><a href="' +
            req.body.link +
            '" target="_blank">' +
            req.body.link +
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
          /<span var="#VarHighTicketProductType">(.*?)<\/span>/g,
          '<span var="#VarHighTicketProductType">' +
            req.body.high_ticket_type +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarBuyerMainGoal">(.*?)<\/span>/g,
          '<span var="#VarBuyerMainGoal">' + req.body.main_goal + "</span>"
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
  FreeShipping.findOne({
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

