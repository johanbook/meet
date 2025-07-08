import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameOrganizationPermissionToFeature1751954839136 implements MigrationInterface {
    name = 'RenameOrganizationPermissionToFeature1751954839136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization_feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "feature" character varying NOT NULL, "organizationId" integer NOT NULL, CONSTRAINT "UQ_80a17b51ea550e8c317d7d95e05" UNIQUE ("organizationId", "feature"), CONSTRAINT "PK_50dca8577e2865085129eddc165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organization_feature" ADD CONSTRAINT "FK_fdbdf3ff0cdb8e8df558006b63c" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "organization_permission"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_feature" DROP CONSTRAINT "FK_fdbdf3ff0cdb8e8df558006b63c"`);
        await queryRunner.query(`DROP TABLE "organization_feature"`);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "UQ_4bac7977fbb00765ef58fe0f63f" UNIQUE ("uuid", "locale")`);
    }

}
