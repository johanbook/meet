import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingColumn1720206668562 implements MigrationInterface {
    name = 'AddMissingColumn1720206668562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD "photoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD CONSTRAINT "UQ_947568bb9d0cd0b94c7541084bf" UNIQUE ("photoId")`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD CONSTRAINT "FK_947568bb9d0cd0b94c7541084bf" FOREIGN KEY ("photoId") REFERENCES "chat_conversation_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP CONSTRAINT "FK_947568bb9d0cd0b94c7541084bf"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP CONSTRAINT "UQ_947568bb9d0cd0b94c7541084bf"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD "photoId" character varying`);
    }

}
