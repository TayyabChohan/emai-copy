const PhysicalProduct = require("../Controller/physicalProductCtrl");
module.exports = (app) => {
  app.post("/physicalProductTemplate", PhysicalProduct.physicalProductTemplate);
  app.post(
    "/updatePhysicalProductTemplate",
    PhysicalProduct.updatePhysicalProductTemplate
  );
  app.post(
    "/singlephysicalproduct",
    PhysicalProduct.deleteCompaign
  );
};
