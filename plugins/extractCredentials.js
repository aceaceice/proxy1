const extractCredentials = (options) => {
  if (options.headers["proxy-authorization"]) {
    const decoding = Buffer.from(
      options.headers["proxy-authorization"].split(" ")[1],
      "base64"
    ).toString();

    const credentials = {
      name: decoding.split(":")[0],
      pass: decoding.split(":")[1],
    };
    return credentials;
  } else {
    return null;
  }
};

module.exports = {
  extractCredentials,
};
