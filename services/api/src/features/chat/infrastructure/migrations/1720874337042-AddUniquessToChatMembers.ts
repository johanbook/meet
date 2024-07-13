import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniquessToChatMembers1720874337042 implements MigrationInterface {
    name = 'AddUniquessToChatMembers1720874337042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP CONSTRAINT "FK_947568bb9d0cd0b94c7541084bf"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ALTER COLUMN "photoId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" DROP CONSTRAINT "FK_39828751da8c4d3e3c1845757cb"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" ALTER COLUMN "conversationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" ADD CONSTRAINT "UQ_1e989018b1b3337580d47aadfbd" UNIQUE ("conversationId", "profileId")`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD CONSTRAINT "FK_947568bb9d0cd0b94c7541084bf" FOREIGN KEY ("photoId") REFERENCES "chat_conversation_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" ADD CONSTRAINT "FK_39828751da8c4d3e3c1845757cb" FOREIGN KEY ("conversationId") REFERENCES "chat_conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" DROP CONSTRAINT "FK_39828751da8c4d3e3c1845757cb"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP CONSTRAINT "FK_947568bb9d0cd0b94c7541084bf"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" DROP CONSTRAINT "UQ_1e989018b1b3337580d47aadfbd"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" ALTER COLUMN "conversationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" ADD CONSTRAINT "FK_39828751da8c4d3e3c1845757cb" FOREIGN KEY ("conversationId") REFERENCES "chat_conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ALTER COLUMN "photoId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD CONSTRAINT "FK_947568bb9d0cd0b94c7541084bf" FOREIGN KEY ("photoId") REFERENCES "chat_conversation_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
