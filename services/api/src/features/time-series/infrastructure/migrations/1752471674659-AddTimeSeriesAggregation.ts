import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeSeriesAggregation1752471674659 implements MigrationInterface {
    name = 'AddTimeSeriesAggregation1752471674659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."time_series_aggregation_enum" AS ENUM('hourly', 'daily', 'weekly', 'monthly', 'yearly', 'total')`);
        await queryRunner.query(`ALTER TABLE "time_series" ADD "aggregation" "public"."time_series_aggregation_enum" NOT NULL DEFAULT 'monthly'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_series" DROP COLUMN "aggregation"`);
        await queryRunner.query(`DROP TYPE "public"."time_series_aggregation_enum"`);
    }

}
