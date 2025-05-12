import { Options as CsvParserOptions, parse } from "csv-parse/sync";
import { readFileSync } from "node:fs";

export function parseCsv<T = unknown>(
  csvContent: string,
  options?: CsvParserOptions,
): T[] {
  return parse(csvContent, { columns: true, comment: "#", ...options });
}

export function readAndParseCsv<T = unknown>(
  path: string,
  csvParserOptions?: CsvParserOptions,
): T[] {
  const fileContent = readFileSync(path, { encoding: "utf8" });
  return parseCsv(fileContent, csvParserOptions);
}
