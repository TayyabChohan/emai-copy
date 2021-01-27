module.exports = (sequelize, Sequelize) => {
  const TemplateBenifits = sequelize.define(
    "tml_benefit",
    {
      ref_id: {
        type: Sequelize.INTEGER,
      },

      benefit: {
        type: Sequelize.STRING,
      },
      template: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return TemplateBenifits;
};
