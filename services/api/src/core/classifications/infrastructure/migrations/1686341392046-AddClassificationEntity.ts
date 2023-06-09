import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClassificationEntity1686341392046 implements MigrationInterface {
    name = 'AddClassificationEntity1686341392046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classification" ("id" SERIAL NOT NULL, "category" character varying(255) NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying(512) NOT NULL, "uuid" uuid NOT NULL, CONSTRAINT "PK_1dc9176492b73104aa3d19ccff4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "classification"`);
    }

}
