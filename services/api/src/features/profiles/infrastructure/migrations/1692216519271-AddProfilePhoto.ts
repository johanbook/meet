import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfilePhoto1692216519271 implements MigrationInterface {
    name = 'AddProfilePhoto1692216519271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile_photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "objectId" uuid NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_74c861d89cc6b7edf34a211064a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "profilePhotoId" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profile_photo"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP "profilePhotoId"`);
    }

}
