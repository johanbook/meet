import { ConfigurationError } from "src/core/error-handling";
import { Logger } from "src/core/logging";

/* eslint-disable sonarjs/no-duplicate-string */

const logger = new Logger("ConfigHelper");

function readEnv(key: string): string | undefined {
  return process.env[key];
}

function stopApplication(): any {
  if (process.env.NODE_ENV === "test") {
    // Test process cannot handle process exit
    throw new ConfigurationError("Invalid configuration");
  }

  process.exit(1);
}

export function getRequiredBooleanConfig(
  key: string,
  defaultValue?: boolean,
): boolean {
  const value = readEnv(key) || defaultValue;

  if (typeof value !== "boolean") {
    logger.fatal("Required environment variable is undefined", {
      env: key,
      type: "boolean",
    });

    return stopApplication();
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
    logger.fatal("Required environment variable is undefined", {
      env: key,
      type: "number",
    });

    return stopApplication();
  }

  return value;
}

export function getRequiredStringConfig(
  key: string,
  defaultValue?: string,
): string {
  const value = readEnv(key) ?? defaultValue;

  if (typeof value !== "string") {
    logger.fatal("Required environment variable is undefined", {
      env: key,
      type: "string",
    });

    return stopApplication();
  }

  return value;
}
