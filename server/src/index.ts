import Fastify, { type FastifyInstance } from "fastify";

import app from "./app";
import { initSwagger } from "./swagger";

const server: FastifyInstance = Fastify({
  logger: true,
});

server.register(app);

initSwagger(server);

server.listen({ port: 3000 });

server.ready((err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${server.server.address()}`);
});
