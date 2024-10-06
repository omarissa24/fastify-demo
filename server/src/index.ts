import Fastify, { FastifyInstance } from "fastify";

// import swagger from "fastify-swagger";
// import { swaggerOptions } from "./config/swagger";
import { healthRouter } from "./routes";

const app: FastifyInstance = Fastify({
  logger: true,
});

app.register(healthRouter);

app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
