module.exports = (sequelize, Sequelize) => {
    const PostWebinar = sequelize.define(
      "tml_strategy_session",
      {
        campaign_id: {
          type: Sequelize.INTEGER,
          references: "campaign", // <<< Note, its table's name, not object name
          referencesKey: "id", // <<< Note, its a column name
        },
  
        name: {
          type: Sequelize.STRING,
        },
        topic: {
          type: Sequelize.STRING,
        },
        core_desire1: {
          type: Sequelize.STRING,
        },
        core_desire2: {
          type: Sequelize.STRING,
        },
        core_desire3: {
          type: Sequelize.STRING,
        },
        calltoaction_link: {
          type: Sequelize.STRING,
        },
        strategy_session_length: {
          type: Sequelize.STRING,
        },
        offer_type: {
          type: Sequelize.STRING,
        },
        call_price: {
          type: Sequelize.STRING,
        },
       
      },
      { timestamps: false, freezeTableName: true }
    );
  
    return PostWebinar;
  };
  