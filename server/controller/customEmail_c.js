const htmlToText = require("html-to-text");
const fs = require("fs");
let path = require("path");

const db = require("../Model/index");

const Email = db.email;
const EmailCustom = db.emailCustom;
const Campaign = db.campaign;

EmailCustom.belongsTo(Email, { foreignKey: "emails_default_id" });
Email.hasMany(EmailCustom, { foreignKey: "emails_default_id" });

exports.selectEmailsCustom = (req, res) => {
  EmailCustom.findAll({
    where: { tenant_id: req.body.tenant_id, campaign_id: req.body.compaignID },
    attributes: [
      "id",
      "subject",
      "body",
      "emails_default_id",
      "affiliate_link",
    ],
    include: [
      {
        model: Email,
        attributes: ["template_id", "send_note", "product_promotion"],
      },
    ],
  })
    .then((result) => {
      let clickbankProducts = [];
      for (let i = 0; i < result.length; i++) {
        clickbankProducts[i] = [
          result[i].emails_default.product_promotion,
          result[i].affiliate_link,
        ];
      }
      let stringArray = clickbankProducts.map(JSON.stringify);
      let uniqueStringArray = new Set(stringArray);
      let uniqueArray = Array.from(uniqueStringArray, JSON.parse);
      res.send({
        success: true,
        err: null,
        value: {
          msg: "Successfully Fetched Emails Data",
          result: result,
          clickbankProducts: uniqueArray,
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

exports.downloadEmailsCustom = (req, res) => {
  Campaign.increment("downloads", {
    by: 1,
    where: { id: req.query.campaign_id },
  });
  let file = fs.createWriteStream(
    __dirname +
      "/../downloads/" +
      `${unescape(req.query.title)
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, "")}` +
      "-" +
      `${req.query.campaign_id}` +
      ".txt"
  );
  EmailCustom.findAll({
    where: {
      tenant_id: req.query.tenant_id,
      campaign_id: req.query.campaign_id,
    },
    attributes: [
      "id",
      "subject",
      "body",
      "emails_default_id",
      "affiliate_link",
    ],
    include: [
      {
        model: Email,
        attributes: ["template_id", "send_note", "product_promotion"],
      },
    ],
  })
    .then((result) => {
      let clickbankProducts = [];
      for (let i = 0; i < result.length; i++) {
        clickbankProducts[i] = [
          result[i].emails_default.product_promotion,
          result[i].affiliate_link,
        ];
      }
      let stringArray = clickbankProducts.map(JSON.stringify);
      let uniqueStringArray = new Set(stringArray);
      let uniqueArray = Array.from(uniqueStringArray, JSON.parse);
      if (uniqueArray.length > 1) {
        file.write(
          "--------\n-----\nClickbank products in this sequence:\n-----\n--------\n\n"
        );
        for (let i = 0; i < uniqueArray.length; i++) {
          file.write(uniqueArray[i][0] + " (Your Affiliate Link - ");
          file.write(
            htmlToText.fromString(uniqueArray[i][1], {
              wordwrap: null,
              hideLinkHrefIfSameAsText: true,
            }) + ") \n\n"
          );
        }
        file.write(
          "--------\n-----\nEmail Sequence: Start:\n-----\n--------\n\n"
        );
      }

      for (let i = 0; i < result.length; i++) {
        const text = htmlToText.fromString(result[i].body, {
          wordwrap: null,
          hideLinkHrefIfSameAsText: true,
        });
        let count = i + 1;
        file.write("Email " + count + ": \n");
        file.write("(" + result[i].emails_default.send_note + ")\n\n");
        if (
          result[i].affiliate_link &&
          result[i].emails_default.product_promotion !== ""
        ) {
          file.write(
            "Product Promotion: " +
              result[i].emails_default.product_promotion +
              ": \n"
          );
          file.write(
            "Your Affiliate Link: " +
              htmlToText.fromString(result[i].affiliate_link, {
                wordwrap: null,
                hideLinkHrefIfSameAsText: true,
              }) +
              ": \n\n"
          );
        }
        file.write("SUBJECT: " + result[i].subject + "\n\n");
        file.write("BODY: \n\n\n");
        file.write(text + "\n\n\n");
      }
      if (uniqueArray.length > 1) {
        file.write("--------\n-----\nEmail Sequence: End\n-----\n--------");
      }
      file.end();
      file.on("finish", () => {
        let EmailsFile = path.join(
          __dirname +
            "/../downloads/" +
            `${unescape(req.query.title)
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9-_]/g, "")}` +
            "-" +
            `${req.query.campaign_id}` +
            ".txt"
        );
        res.setHeader("Content-Disposition", "filename=`${EmailsFile}`");
        res.download(EmailsFile, function (err) {
          if (err) {
            console.log("File Not Downloaded :", err);
          } else {
            file.end();
            fs.unlink(EmailsFile, function (err) {
              if (err) throw err;
              console.log("File deleted!");
            });
            console.log("Downloaded");
          }
        });
      });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Fetching Emails.",
      });
    });
};
