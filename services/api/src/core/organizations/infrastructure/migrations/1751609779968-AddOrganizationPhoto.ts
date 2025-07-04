import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrganizationPhoto1751609779968 implements MigrationInterface {
    name = 'AddOrganizationPhoto1751609779968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization_photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "objectId" uuid NOT NULL, "organizationId" integer NOT NULL, CONSTRAINT "PK_e2877ec75bbc808f858847e8d1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "photoId" uuid`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "UQ_adcae1458164c72770f895b115b" UNIQUE ("photoId")`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_adcae1458164c72770f895b115b" FOREIGN KEY ("photoId") REFERENCES "organization_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_adcae1458164c72770f895b115b"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "UQ_adcae1458164c72770f895b115b"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "photoId"`);
        await queryRunner.query(`DROP TABLE "organization_photo"`);
    }

}
