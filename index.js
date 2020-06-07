const http = require("http");
const url = require("url");
const { blockedResources } = require("./middleware");
const { logger } = require("./utils");
const { allowedFormat } = require("./plugins");
const { check } = require("./plugins");
const auth = require("basic-auth");
const { proxyCheck } = require("./plugins");

const parseIncomingRequest = (clientRequest, clientResponse) => {
  const { host, port, path } = url.parse(clientRequest.url);
  const credentials = auth(clientRequest);
  const { method, headers } = clientRequest;
  const options = {
    method: method,
    headers: headers,
    host: host,
    port: port || 80,
    path: path,
  };
  if (!credentials || !check(credentials.name, credentials.pass)) {
    clientResponse.statusCode = 401;
    clientResponse.setHeader(
      "WWW-Authenticate",
      'Basic realm="Access to the internal site"'
    );
    clientResponse.end("Access denied");
  } else {
    options.allowed =
      !blockedResources(options, allowedFormat) && proxyCheck(options.headers);
    logger(options);
    options.allowed
      ? executeRequest(options, clientRequest, clientResponse)
      : clientResponse.end();
  }
};

const executeRequest = (options, clientRequest, clientResponse) => {
  const externalRequest = http.request(options, (externalResponse) => {
    clientResponse.writeHead(
      externalResponse.statusCode,
      externalResponse.headers
    );
    externalResponse.pipe(clientResponse, { end: true });
  });
  clientRequest.pipe(externalRequest, { end: true });
};
const server = http.createServer(parseIncomingRequest);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(PORT);
});
