import Fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = Fastify({
  logger: true,
});

app.get("/", async () => {
  return { hello: "world" };
});

// Run the server!
app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
