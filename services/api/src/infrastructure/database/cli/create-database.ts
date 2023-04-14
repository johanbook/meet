import { createDatabase } from "typeorm-extension";

import { dataSourceOptions } from "../data-source.config";

async function createDatabaseIfNotExits(): Promise<void> {
  await createDatabase({
    ifNotExist: true,
    options: dataSourceOptions,
    synchronize: false,
  });
}

await createDatabaseIfNotExits();
