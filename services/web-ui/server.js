const handler = require("serve-handler");
const http = require("http");

const PORT = Number.parseInt(process.env.PORT || "8080");

const server = http.createServer((request, response) => {
  return handler(request, response, { public: build });
});

server.listen(PORT, () => {
  console.log("Running at http://localhost:3000");
});
