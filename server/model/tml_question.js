module.exports=(sequelize, Sequelize)=>{
    const Question= sequelize.define(
        "tml_question",
        {
            ref_id: {
                type: Sequelize.INTEGER,
              },
        
              question: {
                type: Sequelize.STRING,
              },
              template: {
                type: Sequelize.STRING,
              },
            },
          { timestamps: false, freezeTableName: true }
    )
    return Question;
    
}