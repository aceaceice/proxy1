const { allowedFormat } = require("./resourceCheck");
const { check } = require("./credentialsCheck");
const { proxyCheck } = require("./proxyCheck");
module.exports = {
  allowedFormat,
  check,
  proxyCheck,
};
