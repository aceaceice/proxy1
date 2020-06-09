const { allowedFormat } = require("./resourceCheck");
const { check } = require("./credentialsCheck");
const { proxyCheck } = require("./proxyCheck");
const { extractCredentials } = require("./extractCredentials");
module.exports = {
  allowedFormat,
  check,
  proxyCheck,
  extractCredentials,
};
