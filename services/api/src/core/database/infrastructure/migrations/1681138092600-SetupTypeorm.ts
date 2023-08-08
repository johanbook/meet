import { MigrationInterface, QueryRunner } from "typeorm";

// See https://github.com/typeorm/typeorm/issues/4923#issuecomment-629135120
export class SetupTypeorm1681018318437 implements MigrationInterface {
  name = "SetupTypeorm1681018318437";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS typeorm_metadata (
        "type" varchar(255) NOT NULL,
        "database" varchar(255) DEFAULT NULL,
        "schema" varchar(255) DEFAULT NULL,
        "table" varchar(255) DEFAULT NULL,
        "name" varchar(255) DEFAULT NULL,
        "value" text
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
