import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfileAndPhotos1681151308845 implements MigrationInterface {
  name = "AddProfileAndPhotos1681151308845";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile_photo" ("id" SERIAL NOT NULL, "imageUrl" character varying(1024) NOT NULL, "profileId" integer, CONSTRAINT "PK_74c861d89cc6b7edf34a211064a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "description" character varying(1024) NOT NULL, "name" character varying(128) NOT NULL, "recentLocation" point NOT NULL, "userId" character varying(128) NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a24972ebd73b106250713dcddd" ON "profile" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "profile_photo" ADD CONSTRAINT "FK_b0ef739fbbf76e987e2e43017ec" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile_photo" DROP CONSTRAINT "FK_b0ef739fbbf76e987e2e43017ec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a24972ebd73b106250713dcddd"`,
    );
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "profile_photo"`);
  }
}
