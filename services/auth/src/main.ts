import { fastifyHttpProxy } from "@fastify/http-proxy";
import { fastifyStatic } from "@fastify/static";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";
import * as path from "node:path";
import { plugin } from "supertokens-node/framework/fastify/index.js";

import { AppModule } from "./app.module";
import { Logger, createPinoLoggerOptions } from "./core/logging/logger.service";
import { SupertokensExceptionFilter } from "./core/supertokens/supertokens.filter";
import { createOpenApiDocument } from "./core/swagger/openapi";

const PORT = Number.parseInt(process.env.PORT || "3000");
const DEV_UI_URL = "http://localhost:8080";
const PRODUCTION = process.env.NODE_ENV === "production";

const PREFIX = "/login";

async function bootstrap() {
  const nestLogger = new Logger("NestJS");

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: createPinoLoggerOptions("Fastify"),
    }),
    {
      bodyParser: PRODUCTION,
      logger: nestLogger,
    },
  );

  app.register(plugin);

  if (PRODUCTION) {
    nestLogger.log("Using static file serving for web client");
    app.register(fastifyStatic, {
      prefix: PREFIX,
      prefixAvoidTrailingSlash: true,
      root: path.join(__dirname, "client"),
      wildcard: true, // Needed for `prefixAvoidTrailingSlash` to work as intended
    });
  } else {
    nestLogger.log("Using proxy for file serving for web client");
    app.register(fastifyHttpProxy, {
      upstream: DEV_UI_URL,
      prefix: PREFIX,
      rewritePrefix: PREFIX,
    });
  }

  app.useGlobalFilters(new SupertokensExceptionFilter());

  const document = createOpenApiDocument(app);
  SwaggerModule.setup("/login/docs", app, document);

  await app.listen(PORT, "0.0.0.0");
}
bootstrap();
