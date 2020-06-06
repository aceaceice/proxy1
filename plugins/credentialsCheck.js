const compare = require("tsscmp");
const credentials = require("../config/credentials");
const check = (name, pass) => {
  let valid = true;

  valid = compare(name, credentials.name) && valid;
  valid = compare(pass, credentials.pass) && valid;
  return valid;
};

module.exports = {
  check,
};
