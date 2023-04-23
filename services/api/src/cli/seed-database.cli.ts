import { runSeeders } from "typeorm-extension";

import { dataSource } from "src/infrastructure/database/data-source";

async function seedDatabase(): Promise<void> {
  await runSeeders(dataSource);
}

seedDatabase();
