import { Logger } from "src/core/logging";

/* eslint-disable sonarjs/no-duplicate-string */

const logger = new Logger("ConfigHelper");

function readEnv(key: string): string | undefined {
  return process.env[key];
}

export function getRequiredBooleanConfig(
  key: string,
  defaultValue?: boolean,
): boolean {
  const value = readEnv(key) || defaultValue;

  if (typeof value !== "boolean") {
    logger.error("Required environment variable is undefined", { env: key });
    process.exit(1);
  }

  return value;
}

export function getRequiredIntConfig(
  key: string,
  defaultValue?: number,
): number {
  const rawValue: string | undefined = readEnv(key);
  let value: number | undefined;

  if (rawValue !== undefined) {
    value = Number.parseInt(rawValue);
  }

  value = value || defaultValue;

  if (typeof value !== "number") {
    logger.error("Required environment variable is undefined", { env: key });
    process.exit();
  }

  return value;
}

export function getRequiredStringConfig(
  key: string,
  defaultValue?: string,
): string {
  const value = readEnv(key) ?? defaultValue;

  if (typeof value !== "string") {
    logger.error("Required environment variable is undefined", { env: key });

    process.exit();
  }

  return value;
}
