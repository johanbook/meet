import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./client/interceptors/logging.interceptor";
import { AuthenticationGuard } from "./client/guards/authentication.guard";
import { ValidationPipe } from "@nestjs/common";

const APP_NAME = "Meet";
const APP_VERSION = process.env.npm_package_version;
const PATH_PREFIX = process.env.PATH_PREFIX || "/api";
const PORT = Number.parseInt(process.env.PORT || "3000");

async function bootstrap() {
  if (!APP_VERSION) {
    console.error("Unable to read app version");
    process.exit(1);
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.setGlobalPrefix(PATH_PREFIX);

  const config = new DocumentBuilder()
    .setTitle(`${APP_NAME} API`)
    .setDescription(
      `The ${APP_NAME} API can be used to interact with ${APP_NAME}`,
    )
    .setVersion(APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${PATH_PREFIX}/docs`, app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new AuthenticationGuard());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(PORT, "0.0.0.0");
}

bootstrap();
