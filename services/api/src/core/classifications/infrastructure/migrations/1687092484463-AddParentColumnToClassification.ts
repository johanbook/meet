import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParentColumnToClassification1687092484463 implements MigrationInterface {
    name = 'AddParentColumnToClassification1687092484463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classification" ADD "parentUuid" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classification" DROP COLUMN "parentUuid"`);
    }

}
