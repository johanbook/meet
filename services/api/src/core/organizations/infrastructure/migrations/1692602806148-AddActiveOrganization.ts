import { MigrationInterface, QueryRunner } from "typeorm";

export class AddActiveOrganization1692602806148 implements MigrationInterface {
    name = 'AddActiveOrganization1692602806148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "active_organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_64a28b90f6b644933e293422be1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "active_organization" ADD CONSTRAINT "FK_60b7353926f26cb16ccc4235408" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "active_organization" DROP CONSTRAINT "FK_60b7353926f26cb16ccc4235408"`);
        await queryRunner.query(`DROP TABLE "active_organization"`);
    }
}
