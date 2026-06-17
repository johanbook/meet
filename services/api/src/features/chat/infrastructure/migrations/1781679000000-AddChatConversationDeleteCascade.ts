import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChatConversationDeleteCascade1781679000000 implements MigrationInterface {
    name = 'AddChatConversationDeleteCascade1781679000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP CONSTRAINT IF EXISTS "FK_17cc04a00b041824b3554dfe895"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD CONSTRAINT "FK_17cc04a00b041824b3554dfe895" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP CONSTRAINT IF EXISTS "FK_17cc04a00b041824b3554dfe895"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD CONSTRAINT "FK_17cc04a00b041824b3554dfe895" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
