import { MigrationInterface, QueryRunner } from "typeorm";

export class EnsureOrganizationFeatureIsEnum1753555345964 implements MigrationInterface {
    name = 'EnsureOrganizationFeatureIsEnum1753555345964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_feature" DROP CONSTRAINT "UQ_80a17b51ea550e8c317d7d95e05"`);
        await queryRunner.query(`CREATE TYPE "public"."organization_feature_feature_enum" AS ENUM('blog', 'bookings', 'chat', 'time-series')`);
        await queryRunner.query(`ALTER TABLE "organization_feature" ALTER COLUMN "feature" TYPE "public"."organization_feature_feature_enum" USING "feature"::"public"."organization_feature_feature_enum" `);
        await queryRunner.query(`ALTER TABLE "organization_feature" ADD CONSTRAINT "UQ_80a17b51ea550e8c317d7d95e05" UNIQUE ("organizationId", "feature")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_feature" DROP CONSTRAINT "UQ_80a17b51ea550e8c317d7d95e05"`);
        await queryRunner.query(`ALTER TABLE "organization_feature" DROP COLUMN "feature"`);
        await queryRunner.query(`DROP TYPE "public"."organization_feature_feature_enum"`);
        await queryRunner.query(`ALTER TABLE "organization_feature" ADD "feature" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization_feature" ADD CONSTRAINT "UQ_80a17b51ea550e8c317d7d95e05" UNIQUE ("feature", "organizationId")`);
    }

}
