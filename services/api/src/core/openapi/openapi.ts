import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

import { Logger } from "src/core/logging";

const APP_NAME = "Meet";
const APP_VERSION = "latest";

export function createOpenApiDocument(app: INestApplication): OpenAPIObject {
  const logger = new Logger("NestJS");

  if (!APP_VERSION) {
    logger.fatal("Unable to read app version");

    /** Make sure app does not start with incorrect configs */
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
