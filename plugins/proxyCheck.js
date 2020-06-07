const proxyCheck = (headers) => {
  return Object.prototype.hasOwnProperty.call(headers, "proxy-connection");
};

module.exports = {
  proxyCheck,
};
