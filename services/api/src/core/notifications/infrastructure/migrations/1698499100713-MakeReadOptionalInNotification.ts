import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeReadOptionalInNotification1698499100713 implements MigrationInterface {
    name = 'MakeReadOptionalInNotification1698499100713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "message" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "read" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "readAt" DROP NOT NULL;`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "message" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "read" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "readAt" SET NOT NULL;`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" SET DEFAULT ''`);
    }

}
