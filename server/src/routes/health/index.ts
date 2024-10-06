// src/routes/examples/index.ts
import { FastifyPluginAsync } from "fastify";

const examples: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async function () {
    return { status: "ok" };
  });
};

export default examples;
