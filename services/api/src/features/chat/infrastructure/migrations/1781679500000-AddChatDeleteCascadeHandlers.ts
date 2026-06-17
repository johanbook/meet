import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChatDeleteCascadeHandlers1781679500000 implements MigrationInterface {
    name = 'AddChatDeleteCascadeHandlers1781679500000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop and recreate foreign key constraint on chat_message pointing to chat_conversation with ON DELETE CASCADE
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT IF EXISTS "FK_71d77a16df3f16e830d645f31f6"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_71d77a16df3f16e830d645f31f6" FOREIGN KEY ("conversationId") REFERENCES "chat_conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert chat_message foreign key constraint to ON DELETE NO ACTION
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT IF EXISTS "FK_71d77a16df3f16e830d645f31f6"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_71d77a16df3f16e830d645f31f6" FOREIGN KEY ("conversationId") REFERENCES "chat_conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}

