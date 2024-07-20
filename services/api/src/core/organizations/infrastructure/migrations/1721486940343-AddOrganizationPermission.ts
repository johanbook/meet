import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrganizationPermission1721486940343 implements MigrationInterface {
    name = 'AddOrganizationPermission1721486940343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization_permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" integer NOT NULL, "permission" character varying NOT NULL, CONSTRAINT "UQ_a9ad5ba8c375cf4924fcfcdd0cf" UNIQUE ("organizationId", "permission"), CONSTRAINT "PK_ff6561c44fcca6c8e16fe459157" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organization_permission" ADD CONSTRAINT "FK_005aa04b3eb93b59b673ef77878" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_permission" DROP CONSTRAINT "FK_005aa04b3eb93b59b673ef77878"`);
        await queryRunner.query(`DROP TABLE "organization_permission"`);
    }

}
