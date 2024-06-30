import { MigrationInterface, QueryRunner } from "typeorm";

import { MigrationError } from "src/core/error-handling";

export class DropJournalTable1699731481699 implements MigrationInterface {
    name = 'DropJournalTable1699731481699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "journal_entry"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new MigrationError("Not supported")
    }

}
