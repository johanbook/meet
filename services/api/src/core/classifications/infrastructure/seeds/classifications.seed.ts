import path from "node:path";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

import { ProductionSeeder } from "src/core/database";

import { loadAllClassificationsInFolder } from "../../application/utils/csv-classification.helper";

@ProductionSeeder()
export default class ClassificationsSeed implements Seeder {
  public async run(dataSouce: DataSource): Promise<void> {
    await loadAllClassificationsInFolder(
      dataSouce,
      path.join(__dirname, "../classifications"),
    );
  }
}
