module.exports = (sequelize, Sequelize) => {
  const GreenEnergy = sequelize.define(
    "tml_green_energy",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      clickbank_id: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return GreenEnergy;
};
