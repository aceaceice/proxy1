const allowedFormat = (path) => {
  return path.match(/\.png|\.jpg/) !== null;
};

module.exports = {
  allowedFormat,
};
