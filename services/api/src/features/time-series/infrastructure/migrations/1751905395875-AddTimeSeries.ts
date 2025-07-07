import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeSeries1751905395875 implements MigrationInterface {
    name = 'AddTimeSeries1751905395875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "time_series_point" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(4096) NOT NULL DEFAULT '', "label" character varying(256) NOT NULL DEFAULT '', "timeSeriesId" uuid NOT NULL, "profileId" integer NOT NULL, "value" double precision NOT NULL, CONSTRAINT "PK_681b282f8816cdf20289e7fd174" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_series" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(2048) NOT NULL DEFAULT '', "name" character varying(255) NOT NULL, "organizationId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_e472f6a5f5bce1c709008a24fe8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "time_series_point" ADD CONSTRAINT "FK_62ef1a9180db121d94e6049e64c" FOREIGN KEY ("timeSeriesId") REFERENCES "time_series"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_series_point" ADD CONSTRAINT "FK_55c81a6ff24b5ab1c8651b5183e" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_series" ADD CONSTRAINT "FK_98cb0c5a27d4f2705fe4209a706" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_series" ADD CONSTRAINT "FK_c8501a2a5c7fdae4b820f3f0f41" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_series" DROP CONSTRAINT "FK_c8501a2a5c7fdae4b820f3f0f41"`);
        await queryRunner.query(`ALTER TABLE "time_series" DROP CONSTRAINT "FK_98cb0c5a27d4f2705fe4209a706"`);
        await queryRunner.query(`ALTER TABLE "time_series_point" DROP CONSTRAINT "FK_55c81a6ff24b5ab1c8651b5183e"`);
        await queryRunner.query(`ALTER TABLE "time_series_point" DROP CONSTRAINT "FK_62ef1a9180db121d94e6049e64c"`);
        await queryRunner.query(`DROP TABLE "time_series"`);
        await queryRunner.query(`DROP TABLE "time_series_point"`);
    }

}
