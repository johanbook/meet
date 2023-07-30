import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSettings1685968335731 implements MigrationInterface {
    name = 'AddSettings1685968335731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "darkmode" boolean NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
