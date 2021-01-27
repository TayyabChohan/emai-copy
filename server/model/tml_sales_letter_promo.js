module.exports = (sequelize, Sequelize) => {
  const SalesLetterPromo = sequelize.define(
    "tml_sales_letter_promo",
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
      core_desire: {
        type: Sequelize.STRING,
      },
      testimonial_quote: {
        type: Sequelize.STRING,
      },
      testimonial_sender: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return SalesLetterPromo;
};
