function prune(value: unknown, redactedValue: string): unknown {
  if (value instanceof Blob || value instanceof Buffer) {
    return redactedValue;
  }

  if (Array.isArray(value)) {
    return value.map((x) => prune(x, redactedValue));
  }

  if (typeof value === "object") {
    const dict = {};

    for (const key in value) {
      // @ts-expect-error // TODO
      dict[key] = prune(value[key], redactedValue);
    }

    return dict;
  }

  return value;
}

export function stringifyAndRedactBinary(
  value: unknown,
  redactedValue = "REDACTED",
): string {
  return JSON.stringify(prune(value, redactedValue));
}
