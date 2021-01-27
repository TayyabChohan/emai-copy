module.exports = (sequelize, Sequelize) => {
  const PostWebinar = sequelize.define(
    "tml_post_webinar",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },

      host: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      topic: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      day: {
        type: Sequelize.STRING,
      },
      call_to_action: {
        type: Sequelize.STRING,
      },
      call_to_action_link: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return PostWebinar;
};
