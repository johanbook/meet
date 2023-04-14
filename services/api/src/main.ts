import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./client/interceptors/logging.interceptor";
import { AuthenticationGuard } from "./client/guards/authentication.guard";
import { ValidationPipe } from "@nestjs/common";
import fastifyMultipart from "@fastify/multipart";
import { createOpenApiDocument } from "./client/openapi";

const PATH_PREFIX = process.env.PATH_PREFIX || "/api";
const PORT = Number.parseInt(process.env.PORT || "3000");

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.setGlobalPrefix(PATH_PREFIX);

  const document = createOpenApiDocument(app);
  SwaggerModule.setup(`${PATH_PREFIX}/docs`, app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new AuthenticationGuard());
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.register(fastifyMultipart);

  await app.listen(PORT, "0.0.0.0");
}

await bootstrap();
