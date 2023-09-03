export function redactBinaries(
  value: unknown,
  redactedValue = "REDACTED",
): unknown {
  if (value instanceof Blob || value instanceof Buffer) {
    return redactedValue;
  }

  if (Array.isArray(value)) {
    return value.map((x) => redactBinaries(x, redactedValue));
  }

  if (typeof value === "object") {
    const dict = {};

    for (const key in value) {
      // @ts-expect-error // TODO
      dict[key] = redactBinaries(value[key], redactedValue);
    }

    return dict;
  }

  return value;
}
