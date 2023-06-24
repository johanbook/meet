import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { Logger, createPinoLoggerOptions } from "./core/logging/logger.service";
import { createOpenApiDocument } from "./core/swagger/openapi";

const PORT = Number.parseInt(process.env.PORT || "3000");

async function bootstrap() {
  const nestLogger = new Logger("NestJS");

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: createPinoLoggerOptions("Fastify"),
    }),
    {
      logger: nestLogger,
    },
  );

  const document = createOpenApiDocument(app);
  SwaggerModule.setup("/tracking/docs", app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(PORT, "0.0.0.0");
}
bootstrap();
