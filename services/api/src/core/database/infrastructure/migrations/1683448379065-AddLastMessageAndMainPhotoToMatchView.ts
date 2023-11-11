import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastMessageAndMainPhotoToMatchView1683448379065 implements MigrationInterface {
    name = 'AddLastMessageAndMainPhotoToMatchView1683448379065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","match","public"]);
        await queryRunner.query(`DROP VIEW "match"`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_d387aec1bec2ca593b517deb6dc"`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "receiverId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "senderId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_d387aec1bec2ca593b517deb6dc" FOREIGN KEY ("receiverId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0" FOREIGN KEY ("senderId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "candidate" AS 
    SELECT 
      s1."profileId" AS "profileId", 
      s1."shownProfileId" as "shownProfileId", 
      profile."name" as "name"
	  FROM swipe s1
	  INNER JOIN swipe s2 ON s1."profileId" = s2."shownProfileId" AND s1."shownProfileId" = s2."profileId" 
    LEFT JOIN profile ON s1."shownProfileId" = profile.id
	  WHERE s1.liked = true AND s2.liked = true;
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","candidate","SELECT \n      s1.\"profileId\" AS \"profileId\", \n      s1.\"shownProfileId\" as \"shownProfileId\", \n      profile.\"name\" as \"name\"\n\t  FROM swipe s1\n\t  INNER JOIN swipe s2 ON s1.\"profileId\" = s2.\"shownProfileId\" AND s1.\"shownProfileId\" = s2.\"profileId\" \n    LEFT JOIN profile ON s1.\"shownProfileId\" = profile.id\n\t  WHERE s1.liked = true AND s2.liked = true;"]);
        await queryRunner.query(`CREATE VIEW "match" AS 
   SELECT s1."profileId",
      s1."shownProfileId",
      profile.name,
    last_message.message as "lastMessage",
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
    WHERE s1.liked = true AND s2.liked = true;
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","match","SELECT s1.\"profileId\",\n      s1.\"shownProfileId\",\n      profile.name,\n    last_message.message as \"lastMessage\",\n    avatar.\"objectId\" as \"photoObjectId\"\n     FROM swipe s1\n       JOIN swipe s2 ON s1.\"profileId\" = s2.\"shownProfileId\" AND s1.\"shownProfileId\" = s2.\"profileId\"\n       LEFT JOIN profile ON s1.\"shownProfileId\" = profile.id\n     LEFT JOIN (\n       SELECT \"objectId\", \"profileId\"\n       FROM profile_photo\n       LIMIT 1\n     ) AS avatar ON s1.\"shownProfileId\" = avatar.\"profileId\"\n     LEFT JOIN (\n       SELECT \"senderId\", \"receiverId\", message\n       FROM chat_message\n       ORDER BY id DESC\n       LIMIT 1\n     ) AS last_message ON \n      (s1.\"profileId\" = last_message.\"senderId\" AND s1.\"shownProfileId\" = last_message.\"receiverId\") OR\n      (s1.\"profileId\" = last_message.\"receiverId\" AND s1.\"shownProfileId\" = last_message.\"senderId\")\n    WHERE s1.liked = true AND s2.liked = true;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","match","public"]);
        await queryRunner.query(`DROP VIEW "match"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","candidate","public"]);
        await queryRunner.query(`DROP VIEW "candidate"`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0"`);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_d387aec1bec2ca593b517deb6dc"`);
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "senderId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_message" ALTER COLUMN "receiverId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a2be22c99b34156574f4e02d0a0" FOREIGN KEY ("senderId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_d387aec1bec2ca593b517deb6dc" FOREIGN KEY ("receiverId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "match" AS SELECT 
      s1."profileId" AS "profileId", 
      s1."shownProfileId" as "shownProfileId", 
      profile."name" as "name"
	  FROM swipe s1
	  INNER JOIN swipe s2 ON s1."profileId" = s2."shownProfileId" AND s1."shownProfileId" = s2."profileId" 
    LEFT JOIN profile ON s1."shownProfileId" = profile.id
	  WHERE s1.liked = true AND s2.liked = true;`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","match","SELECT \n      s1.\"profileId\" AS \"profileId\", \n      s1.\"shownProfileId\" as \"shownProfileId\", \n      profile.\"name\" as \"name\"\n\t  FROM swipe s1\n\t  INNER JOIN swipe s2 ON s1.\"profileId\" = s2.\"shownProfileId\" AND s1.\"shownProfileId\" = s2.\"profileId\" \n    LEFT JOIN profile ON s1.\"shownProfileId\" = profile.id\n\t  WHERE s1.liked = true AND s2.liked = true;"]);
    }

}
