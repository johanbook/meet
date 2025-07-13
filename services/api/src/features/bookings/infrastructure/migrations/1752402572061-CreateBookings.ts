import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookings1752402572061 implements MigrationInterface {
    name = 'CreateBookings1752402572061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(2048) NOT NULL DEFAULT '', "endTime" TIMESTAMP NOT NULL, "name" character varying(255) NOT NULL, "organizationId" integer NOT NULL, "profileId" integer NOT NULL, "startTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_7de109c855905e2a655d796b68a" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_e92ee85850420c227ec980ce76c" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "calendar_event"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_e92ee85850420c227ec980ce76c"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_7de109c855905e2a655d796b68a"`);
        await queryRunner.query(`DROP TABLE "booking"`);
    }

}
