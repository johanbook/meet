import { runSeeders } from "typeorm-extension";

import { dataSource } from "src/core/database/data-source";

async function seedDatabase(): Promise<void> {
  await dataSource.initialize();
  await runSeeders(dataSource);
}

seedDatabase();
