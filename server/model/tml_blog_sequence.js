module.exports = (sequelize, Sequelize) => {
  const Direct_revenue = sequelize.define(
    "tml_blog_sequence",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
      },
      blog_title: {
        type: Sequelize.STRING,
      },
      blog_topic: {
        type: Sequelize.STRING,
      },

      blog_url: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
  return Direct_revenue;
};
