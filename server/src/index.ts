import Fastify, { type FastifyInstance } from "fastify";

import app from "./app";

const server: FastifyInstance = Fastify({ logger: true });

server.register(app);

server.listen({ port: 3000 });

server.ready((err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${server.server.address()}`);
});
