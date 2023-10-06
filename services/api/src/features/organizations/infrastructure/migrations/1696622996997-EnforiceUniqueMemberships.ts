import { MigrationInterface, QueryRunner } from "typeorm";

export class EnforiceUniqueMemberships1696622996997 implements MigrationInterface {
    name = 'EnforiceUniqueMemberships1696622996997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_membership" ADD CONSTRAINT "UQ_873784cbd3a4f257f5fd578f577" UNIQUE ("organizationId", "profileId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_membership" DROP CONSTRAINT "UQ_873784cbd3a4f257f5fd578f577"`);
    }

}
