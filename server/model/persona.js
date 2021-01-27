module.exports = (sequelize, Sequelize) => {
  const Persona = sequelize.define(
    "setup_persona",
    {
      name: {
        type: Sequelize.STRING,
      },
      tenant_id: {
        type: Sequelize.INTEGER,
      },
      bio: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      contact_info: {
        type: Sequelize.STRING,
      },
      support_contact: {
        type: Sequelize.STRING,
      },
      support_email: {
        type: Sequelize.STRING,
      },
      support_url: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Persona;
};
