module.exports = (sequelize, Sequelize) => {
  const EmailCustom = sequelize.define(
    "emails_custom",
    {
      subject: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      affiliate_link: {
        type: Sequelize.STRING,
      },
      emails_default_id: {
        type: Sequelize.INTEGER,
        references: "emails_default", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      tenant_id: {
        type: Sequelize.INTEGER,
        references: "tenant", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return EmailCustom;
};
