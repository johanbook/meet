import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSwipes1682844159027 implements MigrationInterface {
    name = 'AddSwipes1682844159027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "swipe" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "liked" boolean NOT NULL, "profileId" integer, "shownProfileId" integer, CONSTRAINT "PK_cb1669106ad4579aa39400adb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "swipe" ADD CONSTRAINT "FK_90869b608f995397ce365ca1b90" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "swipe" ADD CONSTRAINT "FK_fbb2c2c5eb8e58051fb545dee41" FOREIGN KEY ("shownProfileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "swipe" DROP CONSTRAINT "FK_fbb2c2c5eb8e58051fb545dee41"`);
        await queryRunner.query(`ALTER TABLE "swipe" DROP CONSTRAINT "FK_90869b608f995397ce365ca1b90"`);
        await queryRunner.query(`DROP TABLE "swipe"`);
    }

}
