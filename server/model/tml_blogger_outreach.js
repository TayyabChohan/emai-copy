module.exports = (sequelize, Sequelize) => {
  const BloggerOutreach = sequelize.define(
    "tml_blogger_outreach",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      product_type: {
        type: Sequelize.STRING,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_url: {
        type: Sequelize.STRING,
      },
      product_description: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return BloggerOutreach;
};
