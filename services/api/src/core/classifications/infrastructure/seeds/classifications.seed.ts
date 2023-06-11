import * as path from "node:path";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

import { loadAllClassificationsInFolder } from "../../application/utils/csv-classification.helper";

export default class ClassificationsSeed implements Seeder {
  public async run(dataSouce: DataSource): Promise<void> {
    await loadAllClassificationsInFolder(
      dataSouce,
      /* eslint-disable-next-line unicorn/prefer-module */
      path.join(__dirname, "../classifications"),
    );
  }
}
