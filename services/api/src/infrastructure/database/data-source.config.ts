import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import { TypeOrmLogger } from "../typeorm.logger";

/* eslint-disable unicorn/prefer-module */

dotenv.config();

const logging: DataSourceOptions["logging"] =
  process.env.NODE_ENV == "production" ? ["error"] : "all";

function getConfig(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Required environment variable '${key}' is undefined`);
  }

  return value;
}

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: (process.env.DB_TYPE as any) || "postgres",
  host: getConfig("DB_HOST"),
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  username: getConfig("DB_USERNAME"),
  password: getConfig("DB_PASSWORD"),
  database: getConfig("DB_DATABASE"),
  synchronize: false,
  logging,
  logger: new TypeOrmLogger(),
  entities: [__dirname + "/entities/*.{ts,js}", __dirname + "/views/*.{ts,js}"],
  subscribers: [],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  factories: [__dirname + "/factories/*.{ts,js}"],
  seeds: [__dirname + "/seeds/*.{ts,js}"],
};
