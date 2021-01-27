const db = require("../Model/index");
const Template = db.template;
const { Op } = require("sequelize");
const TemplateBenifits = db.templateBenifits;
const DynamicTemplateBenifits = db.dynamicTemplateBenifits;
const Templatequestions = db.templatequestions;
const PreWebinar = db.preWebinar;
const PostWebinar = db.postWebinar;
const Survey = db.survey;
const Reengagement = db.reengagement;
const Bonding = db.bonding;
const Ascension = db.ascension;
const DirectRevenue = db.directRevenue;
const Cartabdn = db.cartabdn;
const Relaunch = db.relaunch;
const FlasSAle = db.flasSAle;
const PhysicalProduct = db.physicalProduct;
const BlogSequence = db.blogSequence;
const ColdProspecting = db.coldProspecting;
const LmsReport = db.lmsReport;
const LmsVideo = db.lmsVideo;
const LmsSeries = db.lmsSeries;
const StrategySession = db.strategySession;
const PodcastOutreach = db.podcastOutreach;
const BloggerOutreach = db.bloggerOutreach;
const WebinarReplay = db.webinarReplay;
const WebinarPromo = db.webinarPromo;
const WebinarReplaySeq = db.webinarReplaySeq;
const FreeShipping = db.freeShipping;
const VslPromo = db.vslPromo;
const SalesLetterPromo = db.salesLetterPromo;
const SurvivalNiche = db.survivalNiche;
const WomenExBack = db.womenExBack;
const MensExBack = db.mensExBack;
const BusinessOpportunity = db.businessOpportunity;
const Dogtraining = db.dogtraining;
const WomenHealth = db.womenHealth;
const BusinessDevelopment = db.businessDevelopment;
const Menfitness = db.menfitness;
const GreenEnergy = db.greenEnergy;
const FinanceAffiliate = db.financeAffiliate;
const MensDating = db.mensDating;
const PersonalDev = db.personalDev;
const GuitarNiche = db.guitarNiche;
const Photography = db.photography;
const Weddings = db.weddings;
const RealEstate = db.realEstate;
const Drawing = db.drawing;
const Golf = db.golf;
const PaleoLifestyle = db.paleoLifestyle;
const MindBrain = db.mindBrain;

exports.findAll = (req, res) => {
  Template.findAll({
    attributes: ["id", "code", "title", "uri", "type", "embed_code", "is_new"],
  })
    .then((result) => {
      res.send({
        success: true,
        err: null,
        values: {
          msg: "Successfully fetched Templates",
          result: result,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving templates.",
      });
    });
};

exports.templateQuestionsData = (req, res) => {
  let ID, CODE, DATA;
  switch (req.body.template_id) {
    case 1:
      PreWebinar.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 2:
      PostWebinar.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 3:
      Survey.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 4:
      Reengagement.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 5:
      Bonding.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 7:
      Ascension.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 8:
      DirectRevenue.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            Templatequestions.findAll({
              where: {
                [Op.and]: [{ ref_id: ID }, { template: CODE }],
              },
              attributes: ["question"],
            }).then((Question) => {
              res.send({
                success: true,
                err: null,
                value: {
                  msg: "Successfully Fetched Template Question Data",
                  result: DATA,
                  Benefits,
                  Question,
                },
              });
            });
          });
        });
      });
      break;
    case 9:
      Cartabdn.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 10:
      Relaunch.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 104:
      FlasSAle.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 202:
      PhysicalProduct.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 203:
      BlogSequence.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 204:
      ColdProspecting.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 205:
      LmsReport.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 206:
      LmsVideo.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 207:
      LmsSeries.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 212:
      StrategySession.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 216:
      PodcastOutreach.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 217:
      BloggerOutreach.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 219:
      WebinarReplay.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            DynamicTemplateBenifits.findAll({
              where: {
                [Op.and]: [{ ref_id: ID }, { template: CODE }],
              },
              attributes: ["benefit"],
            }).then((DynamicBenefits) => {
              res.send({
                success: true,
                err: null,
                value: {
                  msg: "Successfully Fetched Template Question Data",
                  result: DATA,
                  Benefits,
                  DynamicBenefits,
                },
              });
            });
          });
        });
      });
      break;
    case 220:
      WebinarPromo.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 221:
      WebinarReplaySeq.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            DynamicTemplateBenifits.findAll({
              where: {
                [Op.and]: [{ ref_id: ID }, { template: CODE }],
              },
              attributes: ["benefit"],
            }).then((DynamicBenefits) => {
              res.send({
                success: true,
                err: null,
                value: {
                  msg: "Successfully Fetched Template Question Data",
                  result: DATA,
                  Benefits,
                  DynamicBenefits,
                },
              });
            });
          });
        });
      });
      break;
    case 222:
      FreeShipping.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 226:
      VslPromo.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 227:
      SalesLetterPromo.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        ID = TemplateData.id;
        DATA = TemplateData;
        Template.findOne({
          where: { id: req.body.template_id },
          attributes: ["code"],
        }).then((TemplateCode) => {
          CODE = TemplateCode.code;
          TemplateBenifits.findAll({
            where: {
              [Op.and]: [{ ref_id: ID }, { template: CODE }],
            },
            attributes: ["benefit"],
          }).then((Benefits) => {
            res.send({
              success: true,
              err: null,
              value: {
                msg: "Successfully Fetched Template Question Data",
                result: DATA,
                Benefits,
              },
            });
          });
        });
      });
      break;
    case 100:
      SurvivalNiche.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 101:
      WomenExBack.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 102:
      MensExBack.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 105:
      BusinessOpportunity.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 208:
      Dogtraining.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 209:
      WomenHealth.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 210:
      BusinessDevelopment.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 211:
      Menfitness.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 213:
      GreenEnergy.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 214:
      FinanceAffiliate.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 215:
      MensDating.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 218:
      PersonalDev.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 223:
      GuitarNiche.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 224:
      Photography.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 225:
      Weddings.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 228:
      RealEstate.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 229:
      Drawing.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 230:
      Golf.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 231:
      PaleoLifestyle.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
    case 232:
      MindBrain.findOne({
        where: { campaign_id: req.body.campaign_id },
      }).then((TemplateData) => {
        DATA = TemplateData;
        res.send({
          success: true,
          err: null,
          value: {
            msg: "Successfully Fetched Template Question Data",
            result: DATA,
          },
        });
      });
      break;
  }
};
