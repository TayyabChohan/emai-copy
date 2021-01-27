module.exports = (sequelize, Sequelize) => {
  const Template = sequelize.define(
    "template",
    {
      code: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      uri: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      embed_code: {
        type: Sequelize.STRING,
      },
      is_new: {
        type: Sequelize.BOOLEAN,
      },
      created_on: {
        type: Sequelize.DATE,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Template;
};
