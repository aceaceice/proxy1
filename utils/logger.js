const colors = require("colors/safe");
const logger = (requestData) => {
  console.log(
    `${colors.cyan(requestData.method)}: http://${requestData.host}${
      requestData.path
    } - ${
      requestData.allowed ? colors.green("ALLOWED") : colors.red("BLOCKED")
    }`
  );
};
module.exports = {
  logger,
};
