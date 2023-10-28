import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotification1698494107594 implements MigrationInterface {
    name = 'AddNotification1698494107594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(4096) NOT NULL DEFAULT '', "message" character varying(2048) NOT NULL DEFAULT '', "organizationId" integer NOT NULL, "profileId" integer NOT NULL, "read" boolean NOT NULL, "readAt" TIMESTAMP NOT NULL, "resourcePath" character varying(2048) NOT NULL DEFAULT '', "type" character varying(256) NOT NULL DEFAULT '', CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_4bb0507e70fc50c02e221326f8e" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_4dd039be3d37179110ff3e14901" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_4dd039be3d37179110ff3e14901"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_4bb0507e70fc50c02e221326f8e"`);
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
