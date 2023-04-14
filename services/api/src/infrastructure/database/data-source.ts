import { DataSource } from "typeorm";

import { dataSourceOptions } from "./dataSourceOptions";

// Needed for migrations
export const dataSource = new DataSource(dataSourceOptions);
