import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocalizationToClassifications1686484223894 implements MigrationInterface {
    name = 'AddLocalizationToClassifications1686484223894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classification" ADD "locale" character varying(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classification" ADD "manual" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "classification" ADD "obsolete" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "UQ_4bac7977fbb00765ef58fe0f63f" UNIQUE ("uuid", "locale")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "UQ_4bac7977fbb00765ef58fe0f63f"`);
        await queryRunner.query(`ALTER TABLE "classification" DROP COLUMN "obsolete"`);
        await queryRunner.query(`ALTER TABLE "classification" DROP COLUMN "manual"`);
        await queryRunner.query(`ALTER TABLE "classification" DROP COLUMN "locale"`);
    }

}
