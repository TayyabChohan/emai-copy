module.exports = (sequelize, Sequelize) => {
  const Offer = sequelize.define(
    "setup_offer",
    {
      offer_name: {
        type: Sequelize.STRING,
      },
      tenant_id: {
        type: Sequelize.INTEGER,
      },
      offer_type: {
        type: Sequelize.STRING,
      },
      sale_price: {
        type: Sequelize.STRING,
      },
      normal_price: {
        type: Sequelize.STRING,
      },
      sales_url: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Offer;
};
