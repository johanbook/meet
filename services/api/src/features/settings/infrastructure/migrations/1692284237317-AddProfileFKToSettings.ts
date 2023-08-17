import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfileFKToSettings1692284237317 implements MigrationInterface {
    name = 'AddProfileFKToSettings1692284237317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "darkmode" boolean NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
