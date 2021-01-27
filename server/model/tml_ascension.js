module.exports = (sequelize, Sequelize) => {
  const Ascension = sequelize.define(
    "tml_ascension",
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
      product_link: {
        type: Sequelize.STRING,
      },
      support_link: {
        type: Sequelize.STRING,
      },
      upsell_product: {
        type: Sequelize.STRING,
      },
      upsell_topic: {
        type: Sequelize.STRING,
      },
      upsell_sale_price: {
        type: Sequelize.STRING,
      },
      upsell_normal_price: {
        type: Sequelize.STRING,
      },
      upsell_link: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Ascension;
};
