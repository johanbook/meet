import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteCascadeHandlers1720639767923 implements MigrationInterface {
    name = 'AddDeleteCascadeHandlers1720639767923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_membership" DROP CONSTRAINT "FK_ee8dc62205b4c3acb1483da4142"`);
        await queryRunner.query(`ALTER TABLE "organization_membership" DROP CONSTRAINT "FK_827c4eb64b3510234ee23866f81"`);
        await queryRunner.query(`ALTER TABLE "active_organization" DROP CONSTRAINT "FK_60b7353926f26cb16ccc4235408"`);
        await queryRunner.query(`ALTER TABLE "organization_membership" ADD CONSTRAINT "FK_ee8dc62205b4c3acb1483da4142" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_membership" ADD CONSTRAINT "FK_827c4eb64b3510234ee23866f81" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "active_organization" ADD CONSTRAINT "FK_60b7353926f26cb16ccc4235408" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "active_organization" DROP CONSTRAINT "FK_60b7353926f26cb16ccc4235408"`);
        await queryRunner.query(`ALTER TABLE "organization_membership" DROP CONSTRAINT "FK_827c4eb64b3510234ee23866f81"`);
        await queryRunner.query(`ALTER TABLE "organization_membership" DROP CONSTRAINT "FK_ee8dc62205b4c3acb1483da4142"`);
        await queryRunner.query(`ALTER TABLE "active_organization" ADD CONSTRAINT "FK_60b7353926f26cb16ccc4235408" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_membership" ADD CONSTRAINT "FK_827c4eb64b3510234ee23866f81" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_membership" ADD CONSTRAINT "FK_ee8dc62205b4c3acb1483da4142" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
