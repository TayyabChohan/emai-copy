module.exports = (sequelize, Sequelize) => {
  const OfferBenifit = sequelize.define(
    "setup_benefit",
    {
      benefit: {
        type: Sequelize.STRING,
      },
      offer_id: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return OfferBenifit;
};
