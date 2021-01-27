module.exports = (sequelize, Sequelize) => {
  const Direct_revenue = sequelize.define(
    "tml_direct_revenue",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      general_topic: {
        type: Sequelize.STRING,
      },
      ideal_client: {
        type: Sequelize.STRING,
      },
      investment: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return Direct_revenue;
};
