import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";

/* eslint-disable unicorn/prefer-module */

dotenv.config();

function getConfig(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Required environment variable '${key}' is undefined`);
  }

  return value;
}

type ExtendedDataSourceOptions = DataSourceOptions & {
  factories: string[];
  seeds: string[];
};

export const dataSourceOptions: ExtendedDataSourceOptions = {
  type: (process.env.DB_TYPE as any) || "postgres",
  host: getConfig("DB_HOST"),
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  username: getConfig("DB_USERNAME"),
  password: getConfig("DB_PASSWORD"),
  database: getConfig("DB_DATABASE"),
  synchronize: false,
  logging: "all",
  subscribers: [],
  entities: [__dirname + "/entities/*.{ts,js}"],
  migrations: [__dirname + "/migrations/*.{ts,js}"],
  factories: [__dirname + "/factories/*.{ts,js}"],
  seeds: [__dirname + "/seeds/*.{ts,js}"],
};
