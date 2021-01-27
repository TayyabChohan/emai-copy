const db = require("../Model/index");
const Email = db.email;
/////////// query from persona table for dropdown
exports.getAllPersonas = (req, res) => {
  Email.findAll({
    where: {
      template_id: 2,
    },
    attributes: [
      "subject",
      "id",
      "body",
      "send_note",
      "template_id",
      "created_at",
    ], //object
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Offers.",
      });
    });
};
