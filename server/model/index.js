const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      acquire: process.env.DB_ACQUIRE,
      idle: process.env.DB_IDLE,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.template = require("./template")(sequelize, Sequelize);
db.email = require("./email")(sequelize, Sequelize);
db.preWebinar = require("./tml_pre_webinar")(sequelize, Sequelize);
db.postWebinar = require("./tml_post_webinar")(sequelize, Sequelize);
db.templateBenifits = require("./tml_benefit")(sequelize, Sequelize);
db.dynamicTemplateBenifits = require("./tml_pp_dynamic_benifits")(
  sequelize,
  Sequelize
);
db.templatequestions = require("./tml_question")(sequelize, Sequelize);
db.emailCustom = require("./emails_custom")(sequelize, Sequelize);
db.campaign = require("./campaign")(sequelize, Sequelize);
db.survey = require("./tml_survey")(sequelize, Sequelize);
db.reengagement = require("./tml_reengagement")(sequelize, Sequelize);
db.bonding = require("./tml_bonding")(sequelize, Sequelize);
db.ascension = require("./tml_ascension")(sequelize, Sequelize);
db.cartabdn = require("./tml_cart_abdn")(sequelize, Sequelize);
db.relaunch = require("./tml_relaunch")(sequelize, Sequelize);
db.physicalProduct = require("./tml_physical_product")(sequelize, Sequelize);
db.coldProspecting = require("./tml_cold_prospecting")(sequelize, Sequelize);
db.lmsReport = require("./tml_lms_report")(sequelize, Sequelize);
db.lmsSeries = require("./tml_lms_series")(sequelize, Sequelize);
db.podcastOutreach = require("./tml_podcast_outreach")(sequelize, Sequelize);
db.bloggerOutreach = require("./tml_blogger_outreach")(sequelize, Sequelize);
db.webinarReplay = require("./tml_webinar_replay")(sequelize, Sequelize);
db.webinarReplaySeq = require("./tml_webinar_replay_seq")(sequelize, Sequelize);
db.vslPromo = require("./tml_vsl_promo")(sequelize, Sequelize);
db.salesLetterPromo = require("./tml_sales_letter_promo")(sequelize, Sequelize);
db.directRevenue = require("./tml_direct_revenue")(sequelize, Sequelize);
db.flasSAle = require("./tml_flash_sales")(sequelize, Sequelize);
db.blogSequence = require("./tml_blog_sequence")(sequelize, Sequelize);
db.strategySession = require("./tml_strategy_session")(sequelize, Sequelize);
db.webinarPromo = require("./tml_webinar_promo")(sequelize, Sequelize);
db.freeShipping = require("./tml_free_shipping")(sequelize, Sequelize);
db.lmsVideo = require("./tml_lms_video")(sequelize, Sequelize);
db.survivalNiche = require("./tml_survival_niche")(sequelize, Sequelize);
db.mensExBack = require("./tml_men_exback")(sequelize, Sequelize);
db.businessOpportunity = require("./tml_business_opportunity")(
  sequelize,
  Sequelize
);
db.womenHealth = require("./tml_women_health")(sequelize, Sequelize);
db.businessDevelopment = require("./tml_business_development")(
  sequelize,
  Sequelize
);
db.greenEnergy = require("./tml_green_energy")(sequelize, Sequelize);
db.mensDating = require("./tml_mens_dating")(sequelize, Sequelize);
db.guitarNiche = require("./tml_guitar_niche")(sequelize, Sequelize);
db.weddings = require("./tml_weddings")(sequelize, Sequelize);
db.drawing = require("./tml_drawing")(sequelize, Sequelize);
db.paleoLifestyle = require("./tml_paleo_lifestyle")(sequelize, Sequelize);
db.golf = require("./tml_golf")(sequelize, Sequelize);
db.mindBrain = require("./tml_mind_brain")(sequelize, Sequelize);
db.womenExBack = require("./tml_women_exback")(sequelize, Sequelize);
db.dogtraining = require("./tml_dog_training")(sequelize, Sequelize);
db.menfitness = require("./tml_men_fitness")(sequelize, Sequelize);
db.financeAffiliate = require("./tml_finance_affiliate")(sequelize, Sequelize);
db.personalDev = require("./tml_personal_dev")(sequelize, Sequelize);
db.photography = require("./tml_photography")(sequelize, Sequelize);
db.realEstate = require("./tml_real_estate")(sequelize, Sequelize);

module.exports = db;
