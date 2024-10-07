import Swagger, { type FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import SwaggerUI from "@fastify/swagger-ui";
import fp from "fastify-plugin";

export default fp<FastifyDynamicSwaggerOptions>(async (fastify) => {
  await fastify.register(Swagger, {
    openapi: {
      info: {
        title: "Fastify API",
        description: "API Endpoints for Fastify Starter",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://0.0.0.0:${3000}`,
        },
      ],
      components: {},
    },
  });

  await fastify.register(SwaggerUI, {
    routePrefix: "/docs",
  });
});
