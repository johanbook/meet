import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAndUpdatedAtToProfile1721939780655 implements MigrationInterface {
    name = 'AddCreatedAndUpdatedAtToProfile1721939780655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "createdAt"`);
    }

}
