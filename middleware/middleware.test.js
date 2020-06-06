let { blockedResources } = require("./index");
let { allowedFormat } = require("../plugins/index");
test("returns false", () => {
  let options = {
    path: "/sites/all/themes/scratchpads_eu/images/jellyfish-202px.png",
  };
  expect(blockedResources(options, allowedFormat)).toBeTruthy();
});
