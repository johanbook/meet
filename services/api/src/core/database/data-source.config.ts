import * as dotenv from "dotenv";
import path from "node:path";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import { ConfigurationError } from "../error-handling";
import { TypeOrmLogger } from "./typeorm.logger";

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
  connectTimeoutMS: 30 * 1000,
  logging,
  logger: new TypeOrmLogger(),
  entities: [
    path.join(__dirname, "../../{core,features}/**/{entities,views}/*.{ts,js}"),
  ],
  subscribers: [],
  migrations: [
    // Note that glob should be on both `ts` and `js` to work in both dev and production
    path.join(__dirname, "../../{core,features}/**/migrations/*.{ts,js}"),
  ],
  factories: [
    path.join(__dirname, "/../../{core,features}/**/factories/*.{ts,js}"),
  ],
  seeds: [path.join(__dirname, "/../../{core,features}/**/seeds/*.{ts,js}")],
};
