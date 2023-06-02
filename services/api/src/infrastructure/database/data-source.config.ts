import * as dotenv from "dotenv";
import { join } from "node:path";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import { ConfigurationError } from "src/core/error-handling";

import { TypeOrmLogger } from "../typeorm.logger";

/* eslint-disable unicorn/prefer-module */

dotenv.config();

const logging: DataSourceOptions["logging"] =
  process.env.NODE_ENV == "production" ? ["error"] : "all";

function getConfig(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new ConfigurationError(
      `Required environment variable '${key}' is undefined`,
    );
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
  entities: [
    join(__dirname, "/entities/*.{ts,js}"),
    join(__dirname, "/views/*.{ts,js}"),
    join(__dirname, "../../core/**/entities/*.{ts,js}"),
    join(__dirname, "../../features/**/entities/*.{ts,js}"),
  ],
  subscribers: [],
  migrations: [
    // Note that glob should be on both `ts` and `js` to work in both dev and production
    join(__dirname, "/migrations/*.{ts,js}"),
    join(__dirname, "../../core/**/migrations/*.{ts,js}"),
    join(__dirname, "../../features/**/migrations/*.{ts,js}"),
  ],
  factories: [join(__dirname, "/factories/*.{ts,js}")],
  seeds: [join(__dirname, "/seeds/*.{ts,js}")],
};
