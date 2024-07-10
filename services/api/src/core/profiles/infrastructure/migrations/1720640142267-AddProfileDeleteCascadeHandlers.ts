import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfileDeleteCascadeHandlers1720640142267 implements MigrationInterface {
    name = 'AddProfileDeleteCascadeHandlers1720640142267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_e93f4cc04459521af4d5da5a2cc" UNIQUE ("profilePhotoId")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_e93f4cc04459521af4d5da5a2cc" FOREIGN KEY ("profilePhotoId") REFERENCES "profile_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_e93f4cc04459521af4d5da5a2cc"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_e93f4cc04459521af4d5da5a2cc"`);
    }

}
