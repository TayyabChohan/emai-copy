module.exports = (sequelize, Sequelize) => {
  const Bonding = sequelize.define(
    "tml_bonding",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },

      download_type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      download_name: {
        type: Sequelize.STRING,
      },
      download_link: {
        type: Sequelize.STRING,
      },
      website_url: {
        type: Sequelize.STRING,
      },
      contact_url: {
        type: Sequelize.STRING,
      },
      support_url: {
        type: Sequelize.STRING,
      },
      facebook_url: {
        type: Sequelize.STRING,
      },
      twitter_url: {
        type: Sequelize.STRING,
      },
      youtube_url: {
        type: Sequelize.STRING,
      },
      linkedin_url: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return Bonding;
};
