const extractCredentials = (options) => {
  const decoding = Buffer.from(
    options.headers["proxy-authorization"].split(" ")[1],
    "base64"
  ).toString();

  const credentials = {
    name: decoding.split(":")[0],
    pass: decoding.split(":")[1],
  };
  return credentials;
};

module.exports = {
  extractCredentials,
};
