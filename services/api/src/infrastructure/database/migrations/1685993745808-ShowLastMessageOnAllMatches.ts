import { MigrationInterface, QueryRunner } from "typeorm";

export class ShowLastMessageOnAllMatches1685993745808 implements MigrationInterface {
    name = 'ShowLastMessageOnAllMatches1685993745808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","match","public"]);
        await queryRunner.query(`DROP VIEW "match"`);
        await queryRunner.query(`CREATE VIEW "match" AS 
   SELECT s1."profileId",
      s1."shownProfileId",
      profile.name,
    last_message.message as "lastMessage",
    last_message.created as "lastMessageSent",
    avatar."objectId" as "photoObjectId"
     FROM swipe s1
       JOIN swipe s2 ON s1."profileId" = s2."shownProfileId" AND s1."shownProfileId" = s2."profileId"
       LEFT JOIN profile ON s1."shownProfileId" = profile.id
     LEFT JOIN (
       SELECT "objectId", "profileId"
       FROM profile_photo
       LIMIT 1
     ) AS avatar ON s1."shownProfileId" = avatar."profileId"
     LEFT JOIN (
       SELECT "senderId", "receiverId", message, created
       FROM chat_message cm
       WHERE cm.created = (
         SELECT MAX(created)
         FROM chat_message
         WHERE (cm."senderId" = "senderId" AND cm."receiverId" = "receiverId")
            OR (cm."senderId" = "receiverId" AND cm."receiverId" = "senderId")
         )
     ) AS last_message ON 
      (s1."profileId" = last_message."senderId" AND s1."shownProfileId" = last_message."receiverId") OR
      (s1."profileId" = last_message."receiverId" AND s1."shownProfileId" = last_message."senderId")
    WHERE s1.liked = true AND s2.liked = true;
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","match","SELECT s1.\"profileId\",\n      s1.\"shownProfileId\",\n      profile.name,\n    last_message.message as \"lastMessage\",\n    last_message.created as \"lastMessageSent\",\n    avatar.\"objectId\" as \"photoObjectId\"\n     FROM swipe s1\n       JOIN swipe s2 ON s1.\"profileId\" = s2.\"shownProfileId\" AND s1.\"shownProfileId\" = s2.\"profileId\"\n       LEFT JOIN profile ON s1.\"shownProfileId\" = profile.id\n     LEFT JOIN (\n       SELECT \"objectId\", \"profileId\"\n       FROM profile_photo\n       LIMIT 1\n     ) AS avatar ON s1.\"shownProfileId\" = avatar.\"profileId\"\n     LEFT JOIN (\n       SELECT \"senderId\", \"receiverId\", message, created\n       FROM chat_message cm\n       WHERE cm.created = (\n         SELECT MAX(created)\n         FROM chat_message\n         WHERE (cm.\"senderId\" = \"senderId\" AND cm.\"receiverId\" = \"receiverId\")\n            OR (cm.\"senderId\" = \"receiverId\" AND cm.\"receiverId\" = \"senderId\")\n         )\n     ) AS last_message ON \n      (s1.\"profileId\" = last_message.\"senderId\" AND s1.\"shownProfileId\" = last_message.\"receiverId\") OR\n      (s1.\"profileId\" = last_message.\"receiverId\" AND s1.\"shownProfileId\" = last_message.\"senderId\")\n    WHERE s1.liked = true AND s2.liked = true;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","match","public"]);
        await queryRunner.query(`DROP VIEW "match"`);
        await queryRunner.query(`CREATE VIEW "match" AS SELECT s1."profileId",
      s1."shownProfileId",
      profile.name,
    last_message.message as "lastMessage",
    last_message.created as "lastMessageSent",
    avatar."objectId" as "photoObjectId"
     FROM swipe s1
       JOIN swipe s2 ON s1."profileId" = s2."shownProfileId" AND s1."shownProfileId" = s2."profileId"
       LEFT JOIN profile ON s1."shownProfileId" = profile.id
     LEFT JOIN (
       SELECT "objectId", "profileId"
       FROM profile_photo
       LIMIT 1
     ) AS avatar ON s1."shownProfileId" = avatar."profileId"
     LEFT JOIN (
       SELECT "senderId", "receiverId", message
       FROM chat_message
       ORDER BY id DESC
       LIMIT 1
     ) AS last_message ON 
      (s1."profileId" = last_message."senderId" AND s1."shownProfileId" = last_message."receiverId") OR
      (s1."profileId" = last_message."receiverId" AND s1."shownProfileId" = last_message."senderId")
    WHERE s1.liked = true AND s2.liked = true;`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","match","SELECT s1.\"profileId\",\n      s1.\"shownProfileId\",\n      profile.name,\n    last_message.message as \"lastMessage\",\n    last_message.created as \"lastMessageSent\",\n    avatar.\"objectId\" as \"photoObjectId\"\n     FROM swipe s1\n       JOIN swipe s2 ON s1.\"profileId\" = s2.\"shownProfileId\" AND s1.\"shownProfileId\" = s2.\"profileId\"\n       LEFT JOIN profile ON s1.\"shownProfileId\" = profile.id\n     LEFT JOIN (\n       SELECT \"objectId\", \"profileId\"\n       FROM profile_photo\n       LIMIT 1\n     ) AS avatar ON s1.\"shownProfileId\" = avatar.\"profileId\"\n     LEFT JOIN (\n       SELECT \"senderId\", \"receiverId\", message\n       FROM chat_message\n       ORDER BY id DESC\n       LIMIT 1\n     ) AS last_message ON \n      (s1.\"profileId\" = last_message.\"senderId\" AND s1.\"shownProfileId\" = last_message.\"receiverId\") OR\n      (s1.\"profileId\" = last_message.\"receiverId\" AND s1.\"shownProfileId\" = last_message.\"senderId\")\n    WHERE s1.liked = true AND s2.liked = true;"]);
    }

}
