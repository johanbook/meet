import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCalendarEvent1752394305268 implements MigrationInterface {
    name = 'AddCalendarEvent1752394305268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "calendar_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(2048) NOT NULL DEFAULT '', "endTime" TIMESTAMP NOT NULL, "name" character varying(255) NOT NULL, "organizationId" integer NOT NULL, "profileId" integer NOT NULL, "startTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_176fe24e6eb48c3fef696c7641f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD CONSTRAINT "FK_4f4bc4a207062b3c05fc8fa2ac6" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "calendar_event" ADD CONSTRAINT "FK_9349e137959f3ca5818c2e62b3f" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP CONSTRAINT "FK_9349e137959f3ca5818c2e62b3f"`);
        await queryRunner.query(`ALTER TABLE "calendar_event" DROP CONSTRAINT "FK_4f4bc4a207062b3c05fc8fa2ac6"`);
        await queryRunner.query(`DROP TABLE "calendar_event"`);
    }

}
