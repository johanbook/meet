import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToMembership1694874494988 implements MigrationInterface {
    name = 'AddRoleToMembership1694874494988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."organization_membership_role_enum" AS ENUM('admin', 'member')`);

        // Make current roles to admins
        await queryRunner.query(`ALTER TABLE "organization_membership" ADD "role" "public"."organization_membership_role_enum" NOT NULL DEFAULT 'admin'`);

        await queryRunner.query(`ALTER TABLE "organization_membership" ALTER COLUMN "role" SET DEFAULT 'member'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_membership" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."organization_membership_role_enum"`);
    }
}
