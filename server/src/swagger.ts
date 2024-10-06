import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";
import swaggerJsdoc from "swagger-jsdoc";
import type { SwaggerDefinition } from "swagger-jsdoc";

// Swagger definition
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Fastify starter",
    version: "1.0.0",
    description: "Fastify API",
  },
  host: `0.0.0.0:${process.env.PORT ?? 3000}`,
};

const apiDirectory = join(__dirname, "routes");

const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${apiDirectory}/**/*.js`, `${apiDirectory}/**/*.ts`],
};

export async function initSwagger(app: FastifyInstance) {
  const swaggerSpec = swaggerJsdoc(options);
  const generatedDir = join(__dirname, "generated");

  // Ensure the 'generated' directory exists
  if (!existsSync(generatedDir)) {
    mkdirSync(generatedDir);
  }

  // Write to generated swagger file on development
  if (process.env.NODE_ENV !== "production") {
    writeFileSync(
      join(generatedDir, "swagger.json"),
      JSON.stringify(swaggerSpec, null, 2),
    );
  }

  await app.register(fastifySwagger, {
    mode: "static",
    specification: {
      path: join(generatedDir, "swagger.json"),
      postProcessor(swaggerObject) {
        return swaggerObject;
      },
      baseDir: join(generatedDir),
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest(request, reply, next) {
        next();
      },
      preHandler(request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
}
