module.exports = (sequelize, Sequelize) => {
    const Direct_revenue = sequelize.define(
      "tml_free_shipping",
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
        topic: {
          type: Sequelize.STRING,
        },
  
        type: {
          type: Sequelize.STRING,
        },
  
        link: {
          type: Sequelize.STRING,
        },
        inventory: {
          type: Sequelize.STRING,
        },
        main_goal: {
          type: Sequelize.STRING,
        },
        high_ticket_type: {
          type: Sequelize.STRING,
        },
      },
      { timestamps: false, freezeTableName: true }
    );
    return Direct_revenue;
  };
  