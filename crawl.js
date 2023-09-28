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

module.exports = {
  NormaliseUrl,
};
