import { MigrationError } from "src/core/error-handling";
import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveOldProfilePhoto1692210515677 implements MigrationInterface {
    name = 'RemoveOldProfilePhoto1692210515677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profile_photo" CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new MigrationError("Migration not supported");
    }

}
