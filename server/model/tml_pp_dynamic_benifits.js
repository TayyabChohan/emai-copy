module.exports = (sequelize, Sequelize) => {
  const DynamicTemplateBenifits = sequelize.define(
    "tml_pp_dynamic_benifits",
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
      benefit_type: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return DynamicTemplateBenifits;
};
