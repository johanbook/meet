import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotificationDeleteCascadeHandlers1720640853966 implements MigrationInterface {
    name = 'AddNotificationDeleteCascadeHandlers1720640853966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_4dd039be3d37179110ff3e14901"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_4bb0507e70fc50c02e221326f8e"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_4bb0507e70fc50c02e221326f8e" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_4dd039be3d37179110ff3e14901" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_4dd039be3d37179110ff3e14901"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_4bb0507e70fc50c02e221326f8e"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_4bb0507e70fc50c02e221326f8e" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_4dd039be3d37179110ff3e14901" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
