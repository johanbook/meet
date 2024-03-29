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

  const document = createOpenApiDocument(app);
  SwaggerModule.setup("/auth/api/docs", app, document);

  await app.listen(PORT, "0.0.0.0");
}
bootstrap();
