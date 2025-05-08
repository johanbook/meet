import { readdirSync } from "node:fs";
import path from "node:path";
import { DataSource } from "typeorm";

import { MigrationError } from "src/core/error-handling";
import { Logger } from "src/core/logging";
import { readAndParseCsv } from "src/utils/csv-parser.helper";

const logger = new Logger("CsvClassifications");

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
  parentUuid?: string;
}

export async function loadClassificationsFromCsv(
  dataSource: DataSource,
  filePath: string,
): Promise<void> {
  const { category, locale } = getCategoryAndLocaleFromPath(filePath);

  logger.info(`Seeding classification '${category}' for locale '${locale}'`);

  const parsedClassifications = readAndParseCsv<ParsedClassification>(filePath);

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    for (const classification of parsedClassifications) {
      // NB: The constraint is introduced in migration `AddLocalizationToClassifications1686484223894`
      await queryRunner.query(
        `
    INSERT INTO classification (uuid, category, label, locale, manual, obsolete, "parentUuid")
    VALUES ($1,$2,$3,$4,$5,$6,$7) 
    ON CONFLICT ON CONSTRAINT "UQ_4bac7977fbb00765ef58fe0f63f"
    DO 
       UPDATE SET label = $3, manual = $5, obsolete = $6, "parentUuid" = $7;
  `,
        [
          classification.uuid,
          category,
          classification.label,
          locale,
          classification.manual,
          classification.obsolete,
          classification.parentUuid || null,
        ],
      );
    }
  } catch (error) {
    logger.error("Unable to run migration", { error, filePath });
  } finally {
    await queryRunner.release();
  }
}

export async function loadAllClassificationsInFolder(
  dataSource: DataSource,
  folderPath: string,
): Promise<void> {
  const fileNames = readdirSync(folderPath);

  for (const fileName of fileNames) {
    await loadClassificationsFromCsv(
      dataSource,
      path.join(folderPath, fileName),
    );
  }
}
