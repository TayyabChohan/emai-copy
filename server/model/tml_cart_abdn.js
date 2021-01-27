module.exports = (sequelize, Sequelize) => {
  const ShoppingCartAbandonment = sequelize.define(
    "tml_cart_abdn",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      order_link: {
        type: Sequelize.STRING,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      support_url: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return ShoppingCartAbandonment;
};
