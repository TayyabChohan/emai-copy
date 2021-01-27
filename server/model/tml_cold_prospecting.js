module.exports = (sequelize, Sequelize) => {
  const ColdProspecting = sequelize.define(
    "tml_cold_prospecting",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      website_url: {
        type: Sequelize.STRING,
      },
      prospect_goal: {
        type: Sequelize.STRING,
      },
      prospect_model: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return ColdProspecting;
};
