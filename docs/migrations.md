# Migrations

The software system handles running and creation of database migrations out of
the box.

## Guide

Migrations are run on each system start.

### Creating a new migration

Create a new database entity (or modify an existing one) and run
`./scripts/generate-migration <migration-name>` which will generate a new
migration file that looks some thing like this

```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMonkeys1682844159027 implements MigrationInterface {
  name = "AddMonkeys1682844159027";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "monkey" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(),  "bananas" integer )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "monkey"`);
  }
}
```

Move this migration file to the `infrastructure/migrations` folder in the
relevant feature module.
