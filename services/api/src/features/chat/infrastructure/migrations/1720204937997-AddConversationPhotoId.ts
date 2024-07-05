import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConversationPhotoId1720204937997 implements MigrationInterface {
    name = 'AddConversationPhotoId1720204937997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_photo" ADD "conversationId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD "photoId" character varying`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0" FOREIGN KEY ("senderId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_photo" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0" FOREIGN KEY ("senderId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
