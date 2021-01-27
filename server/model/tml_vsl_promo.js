module.exports = (sequelize, Sequelize) => {
  const VSLPromo = sequelize.define(
    "tml_vsl_promo",
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
      product_topic: {
        type: Sequelize.STRING,
      },
      sales_link: {
        type: Sequelize.STRING,
      },
      sale_price: {
        type: Sequelize.STRING,
      },
      full_price: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return VSLPromo;
};
