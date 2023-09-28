const { NormaliseUrl, getUrlFromHtml } = require("./crawl.js");
const { test, expect, describe } = require("@jest/globals");

//test for noramlising the url

// "https://boot.dev/path"  -> "boot.dev/path"
// "http://boot.dev/path"   -> "boot.dev/path"
// "https://boot.dev/path/" -> "boot.dev/path"
// "https://BOOT.dev/path"  -> "boot.dev/path"

describe("noramlising urls", () => {
  test("normalise url by stripping the protocol", () => {
    const input = "https://boot.dev/path";
    const actualOutput = NormaliseUrl(input);
    const expectedOutput = "boot.dev/path";

    expect(actualOutput).toBe(expectedOutput);
  });

  test("normalise url by stripping trailing slash", () => {
    const input = "https://boot.dev/path/";
    const actualOutput = NormaliseUrl(input);
    const expectedOutput = "boot.dev/path";

    expect(actualOutput).toBe(expectedOutput);
  });

  test("normalise url by  having http request ", () => {
    const input = "http://boot.dev/path/";
    const actualOutput = NormaliseUrl(input);
    const expectedOutput = "boot.dev/path";

    expect(actualOutput).toBe(expectedOutput);
  });

  test("normalise url having capital letter", () => {
    const input = "https://BOOT.dev/path/";
    const actualOutput = NormaliseUrl(input);
    const expectedOutput = "boot.dev/path";

    expect(actualOutput).toBe(expectedOutput);
  });
});

//tests for the get all urls from the html document

describe("Get the urls form the html", () => {
  test("checking for the simple html document", () => {
    const htmlElement = `
    <html>
        <body>
            <a href="https://boot.dev/path">
            Basic path
            </a>
        </body>
    </html>    
        `;

    const baseUrl = "https://boot.dev";

    const actualOutput = getUrlFromHtml(htmlElement, baseUrl);
    const expectedOutput = ["https://boot.dev/path"];

    expect(actualOutput).toEqual(expectedOutput);
  });

  test("checking for the simple html document with invalid url", () => {
    const htmlElement = `
    <html>
        <body>
            <a href="invalid">
            Invalid Path
            </a>
        </body>
    </html>    
        `;

    const baseUrl = "https://boot.dev";

    const actualOutput = getUrlFromHtml(htmlElement, baseUrl);
    const expectedOutput = [];

    expect(actualOutput).toEqual(expectedOutput);
  });
  test("checking for the simple html with multiple urls", () => {
    const htmlElement = `
    <html>
        <body>
            <a href="https://boot.dev/path1">
            Basic path one
            </a>
              <a href="https://boot.dev/path2">
            Basic path two
            </a>
        </body>
    </html>    
        `;

    const baseUrl = "https://boot.dev";

    const actualOutput = getUrlFromHtml(htmlElement, baseUrl);
    const expectedOutput = ["https://boot.dev/path1", "https://boot.dev/path2"];

    expect(actualOutput).toEqual(expectedOutput);
  });
});
