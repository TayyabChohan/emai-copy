module.exports = (sequelize, Sequelize) => {
  const WebinarReplay = sequelize.define(
    "tml_webinar_replay",
    {
      campaign_id: {
        type: Sequelize.INTEGER,
        references: "campaign", // <<< Note, its table's name, not object name
        referencesKey: "id", // <<< Note, its a column name
      },
      name: {
        type: Sequelize.STRING,
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

  return WebinarReplay;
};
