import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1681018318437 implements MigrationInterface {
    name = 'InitialMigration1681018318437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
