import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurrentProfileIdToConnectionView1692731071320 implements MigrationInterface {
    name = 'AddCurrentProfileIdToConnectionView1692731071320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","connection","public"]);
        await queryRunner.query(`DROP VIEW "connection"`);
        await queryRunner.query(`CREATE VIEW "connection" AS 
    SELECT X.ID,
      X.CREATED,
      X."organizationId",
      X."profileId" AS "currentProfileId",
      Y."profileId" AS "profileId",
      PROFILE."name",
      PROFILE_PHOTO."objectId" as "profilePhotoObjectId",
      LAST_MESSAGE.MESSAGE AS "lastMessage",
      LAST_MESSAGE.CREATED AS "lastMessageSent"
    FROM PUBLIC.ORGANIZATION_MEMBERSHIP AS X
    INNER JOIN PUBLIC.ORGANIZATION_MEMBERSHIP Y ON (X."organizationId" = Y."organizationId")
    AND (X."profileId" != Y."profileId")
    LEFT JOIN PROFILE AS PROFILE ON Y."profileId" = PROFILE.ID
    LEFT JOIN PROFILE_PHOTO AS PROFILE_PHOTO ON PROFILE."profilePhotoId" = PROFILE_PHOTO.ID
    LEFT JOIN
      (SELECT "senderId",
          "receiverId",
          MESSAGE,
          CREATED
        FROM CHAT_MESSAGE CM
        WHERE CM.CREATED =
            (SELECT MAX(CREATED)
              FROM CHAT_MESSAGE
              WHERE (CM."senderId" = "senderId"
                            AND CM."receiverId" = "receiverId")
                OR (CM."senderId" = "receiverId"
                        AND CM."receiverId" = "senderId") ) ) AS LAST_MESSAGE ON (X."profileId" = LAST_MESSAGE."senderId"
                        AND Y."profileId" = LAST_MESSAGE."receiverId")
    OR (X."profileId" = LAST_MESSAGE."receiverId"
            AND Y."profileId" = LAST_MESSAGE."senderId") ;
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","connection","SELECT X.ID,\n      X.CREATED,\n      X.\"organizationId\",\n      X.\"profileId\" AS \"currentProfileId\",\n      Y.\"profileId\" AS \"profileId\",\n      PROFILE.\"name\",\n      PROFILE_PHOTO.\"objectId\" as \"profilePhotoObjectId\",\n      LAST_MESSAGE.MESSAGE AS \"lastMessage\",\n      LAST_MESSAGE.CREATED AS \"lastMessageSent\"\n    FROM PUBLIC.ORGANIZATION_MEMBERSHIP AS X\n    INNER JOIN PUBLIC.ORGANIZATION_MEMBERSHIP Y ON (X.\"organizationId\" = Y.\"organizationId\")\n    AND (X.\"profileId\" != Y.\"profileId\")\n    LEFT JOIN PROFILE AS PROFILE ON Y.\"profileId\" = PROFILE.ID\n    LEFT JOIN PROFILE_PHOTO AS PROFILE_PHOTO ON PROFILE.\"profilePhotoId\" = PROFILE_PHOTO.ID\n    LEFT JOIN\n      (SELECT \"senderId\",\n          \"receiverId\",\n          MESSAGE,\n          CREATED\n        FROM CHAT_MESSAGE CM\n        WHERE CM.CREATED =\n            (SELECT MAX(CREATED)\n              FROM CHAT_MESSAGE\n              WHERE (CM.\"senderId\" = \"senderId\"\n                            AND CM.\"receiverId\" = \"receiverId\")\n                OR (CM.\"senderId\" = \"receiverId\"\n                        AND CM.\"receiverId\" = \"senderId\") ) ) AS LAST_MESSAGE ON (X.\"profileId\" = LAST_MESSAGE.\"senderId\"\n                        AND Y.\"profileId\" = LAST_MESSAGE.\"receiverId\")\n    OR (X.\"profileId\" = LAST_MESSAGE.\"receiverId\"\n            AND Y.\"profileId\" = LAST_MESSAGE.\"senderId\") ;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","connection","public"]);
        await queryRunner.query(`DROP VIEW "connection"`);
        await queryRunner.query(`CREATE VIEW "connection" AS SELECT 
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
      ;`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","connection","SELECT \n      \"organizationId\", \n      \"profileId\", \n\t    \"profilePhotoId\",\n      name, \n      last_message.message AS \"lastMessage\",\n      last_message.created AS \"lastMessageSent\"\n    FROM public.organization_membership\n    LEFT JOIN profile as profile on \"profileId\"=profile.id\n    LEFT JOIN (\n         SELECT \"senderId\", \"receiverId\", message, created\n         FROM chat_message cm\n         WHERE cm.created = (\n           SELECT MAX(created)\n           FROM chat_message\n           WHERE (cm.\"senderId\" = \"senderId\" AND cm.\"receiverId\" = \"receiverId\")\n              OR (cm.\"senderId\" = \"receiverId\" AND cm.\"receiverId\" = \"senderId\")\n           )\n       ) AS last_message ON \"profileId\" = last_message.\"senderId\" OR \"profileId\" = last_message.\"receiverId\" \n      ;"]);
    }

}
