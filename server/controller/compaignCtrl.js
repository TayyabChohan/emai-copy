const db = require("../Model/index");
const Compaign = db.campaign;
const Email = db.email;
const EmailCustom = db.emailCustom;
const Template = db.template;
Compaign.belongsTo(Template, { foreignKey: "template_id" });
Template.hasMany(Compaign, { foreignKey: "template_id" });

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.updateCampaignTitle = (req, res) => {
  Compaign.update(
    {
      title: req.body.campaignTitle,
    },
    { where: { id: req.body.compaignID } }
  )
    .then(() => {
      res.send({
        success: true,
        err: null,
        value: {
          msg: "Successfully Updated Campaign Title",
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Updating.",
      });
    });
};

exports.getTemplateType = (req, res) => {
  Compaign.findOne({
    where: { id: req.body.compaignID },
    attributes: ["template_id", "title"],
  })
    .then((result) => {
      Template.findOne({
        where: { id: result.template_id },
        attributes: ["title"],
      }).then((templateTitle) => {
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Type",
            templateTitle: templateTitle.title,
            campaignTitle: result.title,
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Fetching Data.",
      });
    });
};

exports.getAllCompaigns = (req, res) => {
  Compaign.findAll({
    attributes: ["id", "title", "tenant_id", "template_id"],
    where: { tenant_id: req.body.tenant_id},
    include: [{ model: Template, attributes: ["title", "code", "uri"] }],
  }) 
    .then((result) => {
      if (result.length > 0) {
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Campaigns",
            result: result,
          },
        });
      } else {
        res.send({
          success: false,
          err: null,
          value: {
            msg: "Failed! to Fetch Campaigns",
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Fetching Emails.",
      });
    });
};
exports.getOneCompaigns = (req, res) => {
  Compaign.findAll({
    attributes: ["id", "title", "tenant_id", "template_id"],
    where: { id:req.body.campaignId},
    include: [{ model: Template, attributes: ["title", "code", "uri"] }],
  }) 
    .then((result) => {
      if (result.length > 0) {
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Campaigns",
            result: result[0],
          },
        });
      } else {
        res.send({
          success: false,
          err: null,
          value: {
            msg: "Failed! to Fetch Campaigns",
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Fetching Emails.",
      });
    });
};
