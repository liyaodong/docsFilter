const _ = require("lodash");
const path = require("path");
const fs = require("fs-extra");
const sequential = require("promise-sequential");

const axios = require("axios");
require("axiosstreamdownload")(axios);

const downloadFolder = path.resolve(__dirname, "./downloadedFiles");

const getFileName = (url) => {
  return _.last(url.split(/\//));
};

(async () => {
  const result = await fs.readFile(
    path.resolve(__dirname, "./urls.txt"),
    "utf8"
  );

  const urls = result
    .split("\n")
    .map((x) => {
      return x.replace(/"/g, "");
    })
    .filter((x) => /docx?$/.test(x));

  await sequential(
    urls.map((url) => async () => {
      console.log(`Downloading ${getFileName(url)}`);
      await axios.download(url, path.join(downloadFolder, getFileName(url)));
    })
  );

  console.log(`All downloaded, file ${urls.length} downloaded`);
})();
