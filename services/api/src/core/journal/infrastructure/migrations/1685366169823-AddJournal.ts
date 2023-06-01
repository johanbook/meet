import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJournal1685366169823 implements MigrationInterface {
    name = 'AddJournal1685366169823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "journal_entry" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "commandName" text NOT NULL, "payload" json NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_69167f660c807d2aa178f0bd7e6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "journal_entry"`);
    }

}
