import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChatConversation1719777526143 implements MigrationInterface {
    name = 'AddChatConversation1719777526143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_d387aec1bec2ca593b517deb6dc"`);
        await queryRunner.query(`CREATE TABLE "chat_conversation_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileId" integer NOT NULL, "conversationId" uuid, CONSTRAINT "PK_d10ff64b5483ac71c76a89df59c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_conversation_photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "objectId" uuid NOT NULL, CONSTRAINT "PK_e932a60e3964a90adb890646ac7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_conversation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(256) NOT NULL DEFAULT '', "organizationId" integer NOT NULL, CONSTRAINT "PK_0c5b7697e69f674eb983b1e83cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "receiverId"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD "conversationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "senderId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" ADD CONSTRAINT "FK_39828751da8c4d3e3c1845757cb" FOREIGN KEY ("conversationId") REFERENCES "chat_conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" ADD CONSTRAINT "FK_17cc04a00b041824b3554dfe895" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_71d77a16df3f16e830d645f31f6" FOREIGN KEY ("conversationId") REFERENCES "chat_conversation"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0" FOREIGN KEY ("senderId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0"`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_71d77a16df3f16e830d645f31f6"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation" DROP CONSTRAINT "FK_17cc04a00b041824b3554dfe895"`);
        await queryRunner.query(`ALTER TABLE "chat_conversation_member" DROP CONSTRAINT "FK_39828751da8c4d3e3c1845757cb"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "senderId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0" FOREIGN KEY ("senderId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "conversationId"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD "receiverId" integer`);
        await queryRunner.query(`DROP TABLE "chat_conversation"`);
        await queryRunner.query(`DROP TABLE "chat_conversation_photo"`);
        await queryRunner.query(`DROP TABLE "chat_conversation_member"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_d387aec1bec2ca593b517deb6dc" FOREIGN KEY ("receiverId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
