import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrganizations1690406658968 implements MigrationInterface {
    name = 'CreateOrganizations1690406658968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(512) NOT NULL DEFAULT '', "name" character varying(128) NOT NULL, "personal" boolean NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization_membership" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_30b0d822cc1fbae917db1c8b81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organization_membership" ADD CONSTRAINT "FK_ee8dc62205b4c3acb1483da4142" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_membership" ADD CONSTRAINT "FK_827c4eb64b3510234ee23866f81" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_membership" DROP CONSTRAINT "FK_827c4eb64b3510234ee23866f81"`);
        await queryRunner.query(`ALTER TABLE "organization_membership" DROP CONSTRAINT "FK_ee8dc62205b4c3acb1483da4142"`);
        await queryRunner.query(`DROP TABLE "organization_membership"`);
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
