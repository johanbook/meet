import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChatMessages1682849017043 implements MigrationInterface {
    name = 'AddChatMessages1682849017043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_message" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "message" text NOT NULL, "receiverId" integer, "senderId" integer, CONSTRAINT "PK_3cc0d85193aade457d3077dd06b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_d387aec1bec2ca593b517deb6dc" FOREIGN KEY ("receiverId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0" FOREIGN KEY ("senderId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0"`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_d387aec1bec2ca593b517deb6dc"`);
        await queryRunner.query(`DROP TABLE "chat_message"`);
    }

}
