const { Op } = require("sequelize");
const db = require("../Model/index");
const StrategySession = db.strategySession;
const TemplateBenifit = db.templateBenifits;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.saveStrategySessiontemplate = (req, res) => {
  Campaign.create({
    description: "",
    downloads: 0,
    title: req.body.compaignTitle,
    tenant_id: req.body.tenant_id,
    template_id: req.body.template_id,
  })

    .then((campainData) => {
      StrategySession.create({
        campaign_id: campainData.id,
        call_price: req.body.call_price,
        name: req.body.name,
        offer_type: req.body.offer_type,
        strategy_session_length: req.body.strategy_session_length,
        core_desire3: req.body.core_desire3,
        core_desire2: req.body.core_desire2,
        core_desire1: req.body.core_desire1,
        calltoaction_link: req.body.calltoaction_link,
        topic: req.body.topic,
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
                "#CallPrice": req.body.call_price,
                "#StrategySessionLength": req.body.strategy_session_length,
                "#CoreDesire1": req.body.core_desire1,
                "#Topic": req.body.topic,
                "#OfferType": req.body.offer_type,
                "#CoreDesire2": req.body.core_desire2,
                "#CoreDesire3": req.body.core_desire3,
                "#YourName": req.body.name,
                "#Benefits":
                  "<ul><li>" +
                  req.body.benefits.toString().split(",").join("</li><li>") +
                  "</li></ul>",
              };
              customEmailBody = customEmailBody.replace(
                /#CallPrice|#OfferType|#StrategySessionLength|#Topic|#CoreDesire1|#CoreDesire2|#CoreDesire3|#YourName|#Benefits/gi,
                function (matched) {
                  return mapObj[matched];
                }
              );
              customEmailBody = customEmailBody.replace(
                /<span var="#VarCalltoactionLink">(.*?)<\/span>/g,
                '<span var="#VarCalltoactionLink"><a href="' +
                  req.body.calltoaction_link +
                  '" target="_blank">' +
                  req.body.calltoaction_link +
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

exports.updateStrategySessiontemplate = (req, res) => {
  StrategySession.update(
    {
      call_price: req.body.call_price,
      name: req.body.name,
      offer_type: req.body.offer_type,
      strategy_session_length: req.body.strategy_session_length,
      core_desire3: req.body.core_desire3,
      core_desire2: req.body.core_desire2,
      core_desire1: req.body.core_desire1,
      calltoaction_link: req.body.calltoaction_link,
      topic: req.body.topic,
    },
    { where: { campaign_id: req.body.campaign_id } }
  );
  StrategySession.findOne({
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
          /<span var="#VarStrategySessionLength">(.*?)<\/span>/g,
          '<span var="#VarStrategySessionLength">' +
            req.body.strategy_session_length +
            "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarCallPrice">(.*?)<\/span>/g,
          '<span var="#VarCallPrice">' + req.body.call_price + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarCalltoactionLink"><a href="(.*?)" target="_blank">(.*?)<\/a><\/span>/g,
          '<span var="#VarCalltoactionLink"><a href="' +
            req.body.calltoaction_link +
            '" target="_blank">' +
            req.body.calltoaction_link +
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
          /<span var="#VarCoreDesire2">(.*?)<\/span>/g,
          '<span var="#VarCoreDesire2">' + req.body.core_desire2 + "</span>"
        );

        mystring = mystring.replace(
          /<span var="#VarCoreDesire1">(.*?)<\/span>/g,
          '<span var="#VarCoreDesire1">' + req.body.core_desire1 + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarCoreDesire3">(.*?)<\/span>/g,
          '<span var="#VarCoreDesire3">' + req.body.core_desire3 + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarTopic">(.*?)<\/span>/g,
          '<span var="#VarTopic">' + req.body.topic + "</span>"
        );
        mystring = mystring.replace(
          /<span var="#VarOfferType">(.*?)<\/span>/g,
          '<span var="#VarOfferType">' + req.body.offer_type + "</span>"
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
  StrategySession.findOne({
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



