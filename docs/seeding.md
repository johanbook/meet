# Seeding

The software system includes a framework for handling data seeding, support data
per environment. The seeding takes place every time the system starts.

## Example

In order to create a seeder, navigate the `infrastructure/seeds` in a feature
module and create file containing the following:

```ts
import * as path from "node:path";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

import { loadAllClassificationsInFolder } from "src/core/classifications";
import { ProductionSeeder } from "src/core/database";

@ProductionSeeder()
export default class ClassificationsSeed implements Seeder {
  public async run(dataSouce: DataSource): Promise<void> {
    await loadAllClassificationsInFolder(
      dataSouce,
      path.join(__dirname, "../classifications")
    );
  }
}
```

The file will be picked up automatically by the system on start.
