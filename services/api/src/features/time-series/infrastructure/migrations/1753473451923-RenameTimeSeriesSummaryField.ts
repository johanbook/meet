import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTimeSeriesSummaryField1753473451923 implements MigrationInterface {
    name = 'RenameTimeSeriesSummaryField1753473451923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_series" RENAME COLUMN "aggregation" TO "summary"`);
        await queryRunner.query(`ALTER TYPE "public"."time_series_aggregation_enum" RENAME TO "time_series_summary_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."time_series_summary_enum" RENAME TO "time_series_summary_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."time_series_summary_enum" AS ENUM('hourly', 'daily', 'dayOfWeek', 'weekly', 'monthly', 'yearly', 'total')`);
        await queryRunner.query(`ALTER TABLE "time_series" ALTER COLUMN "summary" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "time_series" ALTER COLUMN "summary" TYPE "public"."time_series_summary_enum" USING "summary"::"text"::"public"."time_series_summary_enum"`);
        await queryRunner.query(`ALTER TABLE "time_series" ALTER COLUMN "summary" SET DEFAULT 'monthly'`);
        await queryRunner.query(`DROP TYPE "public"."time_series_summary_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."time_series_summary_enum_old" AS ENUM('hourly', 'daily', 'weekly', 'monthly', 'yearly', 'total')`);
        await queryRunner.query(`ALTER TABLE "time_series" ALTER COLUMN "summary" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "time_series" ALTER COLUMN "summary" TYPE "public"."time_series_summary_enum_old" USING "summary"::"text"::"public"."time_series_summary_enum_old"`);
        await queryRunner.query(`ALTER TABLE "time_series" ALTER COLUMN "summary" SET DEFAULT 'monthly'`);
        await queryRunner.query(`DROP TYPE "public"."time_series_summary_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."time_series_summary_enum_old" RENAME TO "time_series_summary_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."time_series_summary_enum" RENAME TO "time_series_aggregation_enum"`);
        await queryRunner.query(`ALTER TABLE "time_series" RENAME COLUMN "summary" TO "aggregation"`);
    }

}
