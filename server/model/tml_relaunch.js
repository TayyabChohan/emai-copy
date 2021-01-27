module.exports = (sequelize, Sequelize) => {
  const Relaunch = sequelize.define(
    "tml_relaunch",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      next_launch: {
        type: Sequelize.STRING,
      },
      relaunch_link: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Relaunch;
};
