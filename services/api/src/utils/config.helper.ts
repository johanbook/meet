import { ConfigurationError } from "src/core/error-handling";

function readEnv(key: string): string | undefined {
  return process.env[key];
}

export function getRequiredBooleanConfig(
  key: string,
  defaultValue?: boolean,
): boolean {
  const value = readEnv(key) || defaultValue;

  if (typeof value !== "boolean") {
    throw new ConfigurationError(
      `Required environment variable '${key}' is undefined`,
    );
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
    throw new ConfigurationError(
      `Required environment variable '${key}' is undefined`,
    );
  }

  return value;
}

export function getRequiredStringConfig(
  key: string,
  defaultValue?: string,
): string {
  const value = readEnv(key) ?? defaultValue;

  if (typeof value !== "string") {
    throw new ConfigurationError(
      `Required environment variable '${key}' is undefined`,
    );
  }

  return value;
}
