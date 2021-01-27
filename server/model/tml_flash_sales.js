module.exports = (sequelize, Sequelize) => {
  const Direct_revenue = sequelize.define(
    "tml_flash_sales",
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
      product_type: {
        type: Sequelize.STRING,
      },

      product_topic: {
        type: Sequelize.STRING,
      },

      sales_page: {
        type: Sequelize.STRING,
      },
      flash_sale_price: {
        type: Sequelize.STRING,
      },
      retail_price: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return Direct_revenue;
};
