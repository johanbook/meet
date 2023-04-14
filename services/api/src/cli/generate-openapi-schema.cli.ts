// Should be imported first
import "./create-dummy-envs.cli";

import * as fs from "node:fs";
import { Test } from "@nestjs/testing";

import { AppModule } from "src/app.module";
import { createOpenApiDocument } from "src/client/openapi";
import { ObjectStorageService } from "src/infrastructure/objectStorage/object-storage.service";
import { getDataSourceToken } from "@nestjs/typeorm";
import { dataSourceOptions } from "src/infrastructure/database/data-source.config";
import { DataSourceMock } from "src/test/data-source.mock";

const FILE_PATH = "./openapi.json";

class Noop {}

async function generateOpenApiDocument() {
  const appModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(getDataSourceToken(dataSourceOptions))
    .useClass(DataSourceMock)
    .overrideProvider(ObjectStorageService)
    .useClass(Noop)
    .compile();

  const app = appModule.createNestApplication();

  const document = createOpenApiDocument(app);

  await app.close();

  return document;
}

export async function generateOpenApiJsonFile(path: string): Promise<void> {
  const document = await generateOpenApiDocument();
  const json = JSON.stringify(document);

  console.log(`Writing OpenAPI schema to '${path}'`);
  fs.writeFileSync(path, json);
}

generateOpenApiJsonFile(FILE_PATH);
