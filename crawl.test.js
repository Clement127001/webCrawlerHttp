const { NormaliseUrl } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

//test for noramlising the url

// "https://boot.dev/path"  -> "boot.dev/path"
// "http://boot.dev/path"   -> "boot.dev/path"
// "https://boot.dev/path/" -> "boot.dev/path"
// "https://BOOT.dev/path"  -> "boot.dev/path"

test("normalise url stripping the protocol", () => {
  const input = "https://boot.dev/path";
  const actualOutput = NormaliseUrl(input);
  const expectedOutput = "boot.dev/path";

  expect(actualOutput).toBe(expectedOutput);
});

test("normalise url stripping trailing slash", () => {
  const input = "https://boot.dev/path/";
  const actualOutput = NormaliseUrl(input);
  const expectedOutput = "boot.dev/path";

  expect(actualOutput).toBe(expectedOutput);
});

test("normalise url having http request ", () => {
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
