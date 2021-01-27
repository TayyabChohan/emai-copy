const fs = require("fs");

module.exports = function decorators(app) {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file !== "index.js") {
      console.log("initializing decorator:", file);
      require(__dirname + "/" + file)(app);
    }
  });
};
