import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePhotoUrlToUuid1682251679692 implements MigrationInterface {
    name = 'ChangePhotoUrlToUuid1682251679692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_photo" RENAME COLUMN "imageUrl" TO "objectId"`);
        await queryRunner.query(`ALTER TABLE "profile_photo" DROP COLUMN "objectId"`);
        await queryRunner.query(`ALTER TABLE "profile_photo" ADD "objectId" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_photo" DROP COLUMN "objectId"`);
        await queryRunner.query(`ALTER TABLE "profile_photo" ADD "objectId" character varying(1024) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile_photo" RENAME COLUMN "objectId" TO "imageUrl"`);
    }

}
