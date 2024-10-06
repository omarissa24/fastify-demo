import { FastifyPluginAsync } from "fastify";

const health: FastifyPluginAsync = async (fastify): Promise<void> => {
  /**
   * @swagger
   * tags:
   *  name: Health
   *   description: Health check endpoints
   */

  /**
   * @swagger
   * /health:
   *    get:
   *      summary: Health check endpoint
   *      tags: [Health]
   *      responses:
   *        200:
   *          description: Health check is successful
   */
  fastify.get("/", async function (request, reply) {
    reply.send({ status: "ok" });
  });
};

export default health;
