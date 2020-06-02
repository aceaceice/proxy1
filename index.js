const http = require("http");
const url = require("url");
const { blockedResources } = require("./middleware");
const { logger } = require("./utils");
const { allowedFormat } = require("./plugins");

const parseIncomingRequest = (clientRequest, clientResponse) => {
  const requestToFulfil = url.parse(clientRequest.url);

  const options = {
    method: clientRequest.method,
    headers: clientRequest.headers,
    host: requestToFulfil.host,
    port: requestToFulfil.port || 80,
    path: requestToFulfil.path,
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
    externalResponse.on("data", (chunk) => {
      clientResponse.write(chunk);
    });
    externalResponse.on("end", () => {
      clientResponse.end();
    });
  });
  clientRequest.on("data", (chunk) => {
    externalRequest.write(chunk);
  });
  clientRequest.on("end", () => {
    externalRequest.end();
  });
};
const server = http.createServer(parseIncomingRequest);
server.listen(5000);
