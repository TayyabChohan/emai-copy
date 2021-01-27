module.exports = (sequelize, Sequelize) => {
  const Email = sequelize.define(
    "emails_default",
    {
      subject: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      send_note: {
        type: Sequelize.STRING,
      },
      product_promotion: {
        type: Sequelize.STRING,
      },
      affiliate_link: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      template_id: {
        type: Sequelize.INTEGER,
        references: "template", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      created_at: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Email;
};
