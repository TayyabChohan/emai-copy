// ========== LISTENER ========== //;
const chalk = require("chalk");
const app = require("./app.js");

const port = 5000;
app.set("port", process.env.port || port);
app.listen(port, () => {
  console.log(`
  Listening on port: ${chalk.cyan(port)}
  Build System: ${chalk.yellow("N/A")}
  Mode: ${chalk.magenta(process.env.NODE_ENV || process.env.MODE)}
  `);
});
