import { FastifyInstance } from "fastify";

export async function healthRouter(app: FastifyInstance) {
  app.get("/health", async (request, reply) => {
    reply.send({ status: "ok" });
  });
}
