const { check } = require("./index.js");
const credentials = require("../config/credentials");
test("returns true", () => {
  expect(check(credentials.name, credentials.pass)).toBeTruthy();
});
