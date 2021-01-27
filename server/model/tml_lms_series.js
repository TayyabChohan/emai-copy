module.exports = (sequelize, Sequelize) => {
  const LmsSeries = sequelize.define(
    "tml_lms_series",
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
      lms_video_count: {
        type: Sequelize.STRING,
      },
      lms_delivery: {
        type: Sequelize.STRING,
      },
      lms_support_email: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return LmsSeries;
};
