const ShoppingCartAbandonment = require("../Controller/shoppingCartAbandonmentCtrl");
module.exports = (app) => {
  app.post(
    "/shoppingCartAbandonmentTemplate",
    ShoppingCartAbandonment.shoppingCartAbandonmentTemplate
  );
  app.post(
    "/updateShoppingCartAbandonmentTemplate",
    ShoppingCartAbandonment.updateShoppingCartAbandonmentTemplate
  );
  app.post(
    "/shoppingcartabandonment",
    ShoppingCartAbandonment.deleteCompaign
  );
};
