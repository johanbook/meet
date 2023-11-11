import { MigrationInterface, QueryRunner } from "typeorm";

export class EnforceUniqueSwipes1682846152059 implements MigrationInterface {
    name = 'EnforceUniqueSwipes1682846152059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "swipe" ADD CONSTRAINT "UQ_52568c6ccaa98528f1de4f9cbd5" UNIQUE ("profileId", "shownProfileId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "swipe" DROP CONSTRAINT "UQ_52568c6ccaa98528f1de4f9cbd5"`);
    }

}
