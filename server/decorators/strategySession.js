const StrategySession = require("../Controller/strategySessionCtrl");
module.exports = (app) => {
  app.post(
    "/saveStrategySessionForm",
    StrategySession.saveStrategySessiontemplate
  );
  app.post(
    "/updateStrategySessiontemplate",
    StrategySession.updateStrategySessiontemplate
  );
  app.post(
    "/strategysession",
    StrategySession.deleteCompaign
  );
};
