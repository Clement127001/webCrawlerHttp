const { crawlPage } = require("./crawl.js");

const main = () => {
  if (process.argv.length < 3) {
    console.log("No website is provided");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("Too many arguments");
    process.exit(1);
  }

  const baseUrl = process.argv[2];
  crawlPage(baseUrl);
};

main();
