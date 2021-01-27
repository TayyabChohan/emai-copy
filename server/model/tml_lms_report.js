module.exports = (sequelize, Sequelize) => {
  const LmsReoprt = sequelize.define(
    "tml_lms_report",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      lms_topic: {
        type: Sequelize.STRING,
      },
      lms_title: {
        type: Sequelize.STRING,
      },
      lms_url: {
        type: Sequelize.STRING,
      },
      lms_page_count: {
        type: Sequelize.STRING,
      },
      lms_support_email: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return LmsReoprt;
};
