import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMatches1682844231790 implements MigrationInterface {
    name = 'AddMatches1682844231790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE MATERIALIZED VIEW "match" AS 
    SELECT 
      s1."profileId" AS "profileId", 
      s1."shownProfileId" as "shownProfileId", 
      profile."name" as "name"
	  FROM swipe s1
	  INNER JOIN swipe s2 ON s1."profileId" = s2."shownProfileId" AND s1."shownProfileId" = s2."profileId" 
    LEFT JOIN profile ON s1."shownProfileId" = profile.id
	  WHERE s1.liked = true AND s2.liked = true;
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","MATERIALIZED_VIEW","match","SELECT \n      s1.\"profileId\" AS \"profileId\", \n      s1.\"shownProfileId\" as \"shownProfileId\", \n      profile.\"name\" as \"name\"\n\t  FROM swipe s1\n\t  INNER JOIN swipe s2 ON s1.\"profileId\" = s2.\"shownProfileId\" AND s1.\"shownProfileId\" = s2.\"profileId\" \n    LEFT JOIN profile ON s1.\"shownProfileId\" = profile.id\n\t  WHERE s1.liked = true AND s2.liked = true;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["MATERIALIZED_VIEW","match","public"]);
        await queryRunner.query(`DROP MATERIALIZED VIEW "match"`);
    }

}
