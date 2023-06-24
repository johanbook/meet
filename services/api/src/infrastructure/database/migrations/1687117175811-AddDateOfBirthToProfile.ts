import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateOfBirthToProfile1687117175811 implements MigrationInterface {
    name = 'AddDateOfBirthToProfile1687117175811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "dateOfBirth" date NOT NULL DEFAULT '1970-01-01'`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "dateOfBirth" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "dateOfBirth"`);
    }

}
