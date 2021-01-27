module.exports = (sequelize, Sequelize) => {
  const Campaign = sequelize.define(
    "campaign",
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },

      template_id: {
        type: Sequelize.INTEGER,
        references: "template", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        references: "tenant", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      downloads: {
        type: Sequelize.INTEGER,
      },
      created_on: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Campaign;
};
