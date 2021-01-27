module.exports = (sequelize, Sequelize) => {
  const PhysicalProduct = sequelize.define(
    "tml_physical_product",
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
      product_category: {
        type: Sequelize.STRING,
      },
      product_description: {
        type: Sequelize.STRING,
      },
      product_inventory: {
        type: Sequelize.STRING,
      },
      primary_problem: {
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

  return PhysicalProduct;
};
