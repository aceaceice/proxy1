const { proxyCheck } = require("./index");

test("proxy check", () => {
  expect(proxyCheck({ one: 2 })).toBeFalsy();
});
test("proxy check 2", () => {
  expect(proxyCheck({ "proxy-connection": "Keep-alive" })).toBeTruthy();
});
