const db = require("../Model/index");
const EmailCustom = db.emailCustom;

exports.updateEmail = (req, res) => {
  EmailCustom.update(
    { subject: req.body.subject, body: req.body.body },
    { where: { campaign_id: req.body.campaign_id, id: req.body.id } }
  )
    .then(() => {
      res.send({
        success: true,
        err: null,
        value: {
          msg: "Update Email! Successfully!",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while Updating Email.",
      });
    });
};
