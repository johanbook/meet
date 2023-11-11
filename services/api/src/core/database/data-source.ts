import { DataSource } from "typeorm";

import { dataSourceOptions } from "./data-source.config";

// Needed for migrations
export const dataSource = new DataSource(dataSourceOptions);
