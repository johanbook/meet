import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJournalEntryV21699732429511 implements MigrationInterface {
    name = 'CreateJournalEntryV21699732429511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "journal_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "commandName" text NOT NULL, "organizationId" integer NOT NULL, "payload" json NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_69167f660c807d2aa178f0bd7e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "journal_entry" ADD CONSTRAINT "FK_8ab2ce48d25de7470897d4970f3" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journal_entry" ADD CONSTRAINT "FK_6747365996c833749ba53dd39f8" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal_entry" DROP CONSTRAINT "FK_6747365996c833749ba53dd39f8"`);
        await queryRunner.query(`ALTER TABLE "journal_entry" DROP CONSTRAINT "FK_8ab2ce48d25de7470897d4970f3"`);
        await queryRunner.query(`DROP TABLE "journal_entry"`);
    }

}
