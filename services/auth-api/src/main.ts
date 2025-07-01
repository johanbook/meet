import fastifyHelmet from "@fastify/helmet";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";
import { plugin } from "supertokens-node/framework/fastify/index.js";

import { AppModule } from "./app.module";
import { Logger, createPinoLoggerOptions } from "./core/logging/logger.service";
import { SupertokensExceptionFilter } from "./core/supertokens/supertokens.filter";
import { createOpenApiDocument } from "./core/swagger/openapi";

const PORT = Number.parseInt(process.env.PORT || "3000");
const PRODUCTION = process.env.NODE_ENV === "production";
const UI_DOMAIN = process.env.UI_URL || `http://localhost`;

// Needed for Supertokens
const SUPERTOKENS_CSP_URL = "https://cdn.jsdelivr.net/gh/supertokens/";

const CSP = {
  "img-src": [SUPERTOKENS_CSP_URL],
  "script-src": [SUPERTOKENS_CSP_URL],
  "script-src-elem": [
    // Needed for Supertokens
    "'inline'",
    SUPERTOKENS_CSP_URL,
  ],
};

const CORS_OPTIONS = {
  origin: [UI_DOMAIN],
};

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

  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.enableCors(CORS_OPTIONS);

  const document = createOpenApiDocument(app);
  SwaggerModule.setup("/auth/api/docs", app, document);

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: CSP,
    },
  });

  await app.listen(PORT, "0.0.0.0");
}

bootstrap();
