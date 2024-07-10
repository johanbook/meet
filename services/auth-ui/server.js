const Fastify = require("fastify");
const path = require("path");

const PORT = Number.parseInt(process.env.PORT || "8080");
const PREFIX = "/login";

const fastify = Fastify({ logger: true });

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "build"),
  prefix: PREFIX,
  prefixAvoidTrailingSlash: true,
  serveDotFiles: true,
  wildcard: true,
});

fastify.setNotFoundHandler((_, reply) => {
  return reply.sendFile("index.html");
});

fastify.listen(
  {
    host: "0.0.0.0",
    port: PORT,
  },
  (err, address) => {
    if (err) throw err;
  }
);
