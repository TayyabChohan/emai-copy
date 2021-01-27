module.exports = (sequelize, Sequelize) => {
  const Survey = sequelize.define(
    "tml_survey",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      survey_link: {
        type: Sequelize.STRING,
      },
      results_link: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Survey;
};
