import { createDatabase } from "typeorm-extension";
import { dataSourceOptions } from "../dataSourceOptions";

async function createDatabaseIfNotExits(): Promise<void> {
  await createDatabase({
    ifNotExist: true,
    options: dataSourceOptions,
    synchronize: false,
  });
}

createDatabaseIfNotExits();
