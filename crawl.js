const { JSDOM } = require("jsdom");

//function to crawl the url and get the html element

const crawlPage = async (currentUrl) => {
  try {
    const url = new URL(currentUrl);
    console.log("started crawling from the crawl js function");
    const response = await fetch(currentUrl);

    //for checking the status of the response
    if (response.status > 399) {
      console.log(`Error occured got ${response.status} `);
      return;
    }

    //for make sure we are getting the html/text page
    const contentType = response.headers.get("content-type");

    if (!contentType.includes("text/html")) {
      console.log(`Got ${contentType} file instead of text/html file`);

      return;
    }

    console.log(await response.text());
  } catch (err) {
    console.log(
      "Error occured : " + err.message + " at the page : " + currentUrl
    );
  }
};

//function fo normalising all the urls
const NormaliseUrl = (url) => {
  const baseUrl = new URL(url);
  let pathname = baseUrl.pathname;
  let hostname = baseUrl.hostname;

  //stripping out the last slash in the url
  if (pathname.length > 0 && pathname.slice(-1) === "/") {
    pathname = pathname.slice(0, -1);
  }

  return `${hostname}${pathname}`;
};

//get all the urls in the html page
const getUrlFromHtml = (htmlbody, baseUrl) => {
  const htmlElement = new JSDOM(htmlbody);
  const linkElements = htmlElement.window.document.querySelectorAll("a");

  const foundUrls = [];

  for (let linkElement of linkElements) {
    try {
      const urls = new URL(linkElement);

      if (urls.toString().slice(0) === "/") {
        foundUrls.push(`${baseUrl}${urls.href}`);
      } else {
        foundUrls.push(urls.href);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return foundUrls;
};

module.exports = {
  NormaliseUrl,
  getUrlFromHtml,
  crawlPage,
};
