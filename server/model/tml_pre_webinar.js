module.exports = (sequelize, Sequelize) => {
  const PreWebinar = sequelize.define(
    "tml_pre_webinar",
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
      time: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  return PreWebinar;
};
