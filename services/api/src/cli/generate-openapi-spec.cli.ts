// Should be imported first
import "./create-dummy-envs.cli";

import { Test } from "@nestjs/testing";
import { getDataSourceToken } from "@nestjs/typeorm";
import * as fs from "node:fs";

import { AppModule } from "src/app.module";
import { createOpenApiDocument } from "src/core/openapi";
import { dataSourceOptions } from "src/core/database/data-source.config";
import { ObjectStorageService } from "src/core/object-storage";
import { DataSourceMock } from "src/test/data-source.mock";


const FILE_PATH = "./openapi.json";
const PATH_PREFIX = process.env.PATH_PREFIX || "/api";

class Noop {}

async function generateOpenApiDocument() {
  console.log("Setting up dummy application");

  const appModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(getDataSourceToken(dataSourceOptions))
    .useClass(DataSourceMock)
    .overrideProvider(ObjectStorageService)
    .useClass(Noop)
    .compile();

  const app = appModule.createNestApplication();
  app.setGlobalPrefix(PATH_PREFIX);

  console.log("Generating OpenAPI document");
  const document = createOpenApiDocument(app);

  await app.close();

  return document;
}

export async function generateOpenApiJsonFile(path: string): Promise<void> {
  const document = await generateOpenApiDocument();
  const json = JSON.stringify(document);

  console.log(`Writing OpenAPI specification to '${path}'`);
  fs.writeFileSync(path, json);

  // Needed for process to exit cleanly
  process.exit(0)
}

generateOpenApiJsonFile(FILE_PATH);
