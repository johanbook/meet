import fastifyHelmet from "@fastify/helmet";
import fastifyMultipart, { MultipartFile } from "@fastify/multipart";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";

import {
  Logger,
  LoggingInterceptor,
  createPinoLoggerOptions,
} from "src/core/logging";
import { createOpenApiDocument } from "src/core/openapi";

import { AppModule } from "./app.module";
import { getRequiredStringConfig } from "./utils/config.helper";

const PATH_PREFIX = process.env.PATH_PREFIX || "/api";
const PORT = Number.parseInt(process.env.PORT || "3000");
const UI_DOMAIN = getRequiredStringConfig("UI_DOMAIN");

const CORS_OPTIONS = {
  origin: [UI_DOMAIN],
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: createPinoLoggerOptions("Fastify"),
    }),
    { logger: new Logger("NestJS") },
  );

  app.setGlobalPrefix(PATH_PREFIX);
  app.enableCors(CORS_OPTIONS);

  const document = createOpenApiDocument(app);
  SwaggerModule.setup(`${PATH_PREFIX}/docs`, app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {},
    },
  });

  await app.register(fastifyMultipart, {
    attachFieldsToBody: "keyValues",
    limits: {
      fileSize: 2 * 1000 * 1000,
      files: 10,
    },
    // Reject oversized uploads with a 413 instead of buffering them into
    // memory (the web client pre-resizes photos, so these limits are a
    // defense for other callers)
    throwFileSizeLimit: true,
    onFile: async (part: MultipartFile) => {
      // The plugin reads `value` when attaching the body; the installed
      // types omit the field, so cast once at this boundary
      const partWithValue = part as unknown as { value: Buffer };
      partWithValue.value = await part.toBuffer();
    },
  });

  await app.listen(PORT, "0.0.0.0");
}

bootstrap();
