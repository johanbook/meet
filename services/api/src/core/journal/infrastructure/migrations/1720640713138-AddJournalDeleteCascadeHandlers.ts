import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJournalDeleteCascadeHandlers1720640713138 implements MigrationInterface {
    name = 'AddJournalDeleteCascadeHandlers1720640713138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal_entry" DROP CONSTRAINT "FK_6747365996c833749ba53dd39f8"`);
        await queryRunner.query(`ALTER TABLE "journal_entry" DROP CONSTRAINT "FK_8ab2ce48d25de7470897d4970f3"`);
        await queryRunner.query(`ALTER TABLE "journal_entry" ADD CONSTRAINT "FK_8ab2ce48d25de7470897d4970f3" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journal_entry" ADD CONSTRAINT "FK_6747365996c833749ba53dd39f8" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "journal_entry" DROP CONSTRAINT "FK_6747365996c833749ba53dd39f8"`);
        await queryRunner.query(`ALTER TABLE "journal_entry" DROP CONSTRAINT "FK_8ab2ce48d25de7470897d4970f3"`);
        await queryRunner.query(`ALTER TABLE "journal_entry" ADD CONSTRAINT "FK_8ab2ce48d25de7470897d4970f3" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "journal_entry" ADD CONSTRAINT "FK_6747365996c833749ba53dd39f8" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
