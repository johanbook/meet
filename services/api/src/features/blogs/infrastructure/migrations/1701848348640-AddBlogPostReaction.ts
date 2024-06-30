import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogPostReaction1701848348640 implements MigrationInterface {
    name = 'AddBlogPostReaction1701848348640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_post_reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "blogPostId" uuid NOT NULL, "profileId" integer NOT NULL, "reaction" character varying(8) NOT NULL, CONSTRAINT "UQ_01fd489a7620f1dcef73d008094" UNIQUE ("blogPostId", "profileId"), CONSTRAINT "PK_5b5b61684e2a721319e12af41ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_post_reaction" ADD CONSTRAINT "FK_7ccf96dcefc5ef172bb0bb6517f" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_reaction" ADD CONSTRAINT "FK_11e0938003df1680e02080fca6a" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_reaction" DROP CONSTRAINT "FK_11e0938003df1680e02080fca6a"`);
        await queryRunner.query(`ALTER TABLE "blog_post_reaction" DROP CONSTRAINT "FK_7ccf96dcefc5ef172bb0bb6517f"`);
        await queryRunner.query(`DROP TABLE "blog_post_reaction"`);
    }

}
