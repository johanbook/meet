import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrganizationTheme1751569570326 implements MigrationInterface {
    name = 'AddOrganizationTheme1751569570326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ADD "theme" character varying(32) NOT NULL DEFAULT 'default'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "theme"`);
    }

}
