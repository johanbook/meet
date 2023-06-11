import * as path from "node:path";
import { QueryRunner } from "typeorm";

import { MigrationError } from "src/core/error-handling";
import { readAndParseCsv } from "src/utils/csv-parser.helper";

interface GetCategoryAndLocaleFromPathResult {
  category: string;
  locale: string;
}

export function getCategoryAndLocaleFromPath(
  filePath: string,
): GetCategoryAndLocaleFromPathResult {
  const fileName = path.parse(filePath).name;

  const parts = fileName.split("_");

  if (parts.length !== 2) {
    throw new MigrationError(
      `Filename '${fileName}' must contain exactly one underscore to separate category from locale. Found ${parts.length} underscores.`,
    );
  }

  const [category, locale] = parts;

  return {
    category,
    locale,
  };
}

interface ParsedClassification {
  uuid: string;
  label: string;
  manual: boolean;
  obsolete: boolean;
}

export async function loadClassificationsFromCsv(
  queryRunner: QueryRunner,
  filePath: string,
): Promise<void> {
  const { category, locale } = getCategoryAndLocaleFromPath(filePath);

  const parsedClassifications = readAndParseCsv<ParsedClassification>(filePath);

  for (const classification of parsedClassifications) {
    await queryRunner.query(
      `
    INSERT INTO classifications (uuid, category, label, locale, manual, obsolete)
    VALUES ($1,$2,$3,$4,$5,$6) 
    ON CONFLICT ON CONSTRAINT "UQ_4bac7977fbb00765ef58fe0f63f"
    DO 
       UPDATE SET label = $3, manual = $5, obsolete = $6;
  `,
      [
        classification.uuid,
        category,
        classification.label,
        locale,
        classification.manual,
        classification.obsolete,
      ],
    );
  }
}
