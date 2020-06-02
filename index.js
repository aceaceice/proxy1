const http = require("http");
const url = require("url");
const { blockedResources } = require("./middleware");
const { logger } = require("./utils");
const { allowedFormat } = require("./plugins");

const parseIncomingRequest = (clientRequest, clientResponse) => {
  const { host, port, path } = url.parse(clientRequest.url);

  const options = {
    method: clientRequest.method,
    headers: clientRequest.headers,
    host: host,
    port: port || 80,
    path: path,
  };

  if (blockedResources(options, allowedFormat)) {
    options.allowed = false;
    logger(options);
    clientResponse.end();
  } else {
    options.allowed = true;
    logger(options);
    executeRequest(options, clientRequest, clientResponse);
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
server.listen(5000);
