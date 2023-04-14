import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";

const APP_NAME = "Meet";
const APP_VERSION = process.env.npm_package_version;

export function createOpenApiDocument(app: INestApplication): OpenAPIObject {
  if (!APP_VERSION) {
    console.error("Unable to read app version");
    process.exit(1);
  }

  const config = new DocumentBuilder()
    .setTitle(`${APP_NAME} API`)
    .setDescription(
      `The ${APP_NAME} API can be used to interact with ${APP_NAME}`,
    )
    .setVersion(APP_VERSION)
    .build();

  return SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_, methodKey) => methodKey,
  });
}
