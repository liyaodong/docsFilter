const jsonfile = require("jsonfile");
const report = require("./report.json");
const path = require("path");

(async () => {
  const invalidResult = report.filter((x) => !x.isValid);
  await jsonfile.writeFile(
    path.resolve(__dirname, "./invalidReport.json"),
    invalidResult
  );
  console.log(`Invalid Count: ${invalidResult.length}`);
})();
