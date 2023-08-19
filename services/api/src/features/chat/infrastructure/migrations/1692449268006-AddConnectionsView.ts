import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConnectionsView1692449268006 implements MigrationInterface {
    name = 'AddConnectionsView1692449268006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW "connection" AS 
    SELECT 
      "organizationId", 
      "profileId", 
	    "profilePhotoId",
      name, 
      last_message.message AS "lastMessage",
      last_message.created AS "lastMessageSent"
    FROM public.organization_membership
    LEFT JOIN profile as profile on "profileId"=profile.id
    LEFT JOIN (
         SELECT "senderId", "receiverId", message, created
         FROM chat_message cm
         WHERE cm.created = (
           SELECT MAX(created)
           FROM chat_message
           WHERE (cm."senderId" = "senderId" AND cm."receiverId" = "receiverId")
              OR (cm."senderId" = "receiverId" AND cm."receiverId" = "senderId")
           )
       ) AS last_message ON "profileId" = last_message."senderId" OR "profileId" = last_message."receiverId" 
      ;
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","connection","SELECT \n      \"organizationId\", \n      \"profileId\", \n\t    \"profilePhotoId\",\n      name, \n      last_message.message AS \"lastMessage\",\n      last_message.created AS \"lastMessageSent\"\n    FROM public.organization_membership\n    LEFT JOIN profile as profile on \"profileId\"=profile.id\n    LEFT JOIN (\n         SELECT \"senderId\", \"receiverId\", message, created\n         FROM chat_message cm\n         WHERE cm.created = (\n           SELECT MAX(created)\n           FROM chat_message\n           WHERE (cm.\"senderId\" = \"senderId\" AND cm.\"receiverId\" = \"receiverId\")\n              OR (cm.\"senderId\" = \"receiverId\" AND cm.\"receiverId\" = \"senderId\")\n           )\n       ) AS last_message ON \"profileId\" = last_message.\"senderId\" OR \"profileId\" = last_message.\"receiverId\" \n      ;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","connection","public"]);
        await queryRunner.query(`DROP VIEW "connection"`);
    }

}
