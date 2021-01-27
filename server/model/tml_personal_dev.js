module.exports = (sequelize, Sequelize) => {
    const Personal_dev = sequelize.define(
      "tml_personal_dev",
      {
        campaign_id: {
          type: Sequelize.INTEGER,
          references: "campaign", // <<< Note, its table's name, not object name
          referencesKey: "id", // <<< Note, its a column name
        },
       
        name: {
          type: Sequelize.STRING,
        },
        clickbank_id: {
          type: Sequelize.STRING,
        },
        mindmovies_id: {
          type: Sequelize.STRING,
        },
        
      },
      { timestamps: false, freezeTableName: true }
    );
  
    return Personal_dev;
  };
  