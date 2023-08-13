import fastifyMultipart from "@fastify/multipart";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";

import {
  Logger,
  createPinoLoggerOptions,
  LoggingInterceptor,
} from "src/core/logging";
import { createOpenApiDocument } from "src/core/openapi";

import { AppModule } from "./app.module";

const PATH_PREFIX = process.env.PATH_PREFIX || "/api";
const PORT = Number.parseInt(process.env.PORT || "3000");

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: createPinoLoggerOptions("Fastify"),
    }),
    { logger: new Logger("NestJS") },
  );

  app.setGlobalPrefix(PATH_PREFIX);

  const document = createOpenApiDocument(app);
  SwaggerModule.setup(`${PATH_PREFIX}/docs`, app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.register(fastifyMultipart, {
    attachFieldsToBody: "keyValues",
  });

  await app.listen(PORT, "0.0.0.0");
}

bootstrap();
