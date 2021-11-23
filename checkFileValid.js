const _ = require("lodash");
const path = require("path");
const fs = require("fs-extra");
const sequential = require("promise-sequential");
const textract = require("textract");
const jsonfile = require("jsonfile");

const VALID_LENGTH = 10;

const downloadFolder = path.resolve(__dirname, "./downloadedFiles");
(async () => {
  const files = await fs.readdir(downloadFolder);
  const text = await sequential(
    files.map((filePath) => () => {
      const fileLocation = path.join(downloadFolder, filePath);
      return new Promise((res) => {
        textract.fromFileWithPath(fileLocation, function (error, text = "") {
          const fileContent = text ? text : "";
          const isValid = fileContent.length > VALID_LENGTH;
          console.log(`Check file: ${filePath}`);
          res({ file: filePath, isValid, wordCount: fileContent.length });
        });
      });
    })
  );

  await jsonfile.writeFile(path.resolve(__dirname, "./report.json"), text);
  console.log(`Scan done: `);
  console.log(text);
})();
