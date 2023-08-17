import { MigrationInterface, QueryRunner } from "typeorm";

import { MigrationError } from "src/core/error-handling";

export class AddProfileFKToSettings1692283763904 implements MigrationInterface {
    name = 'AddProfileFKToSettings1692283763904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        throw new MigrationError("Not supported");
    }

}
