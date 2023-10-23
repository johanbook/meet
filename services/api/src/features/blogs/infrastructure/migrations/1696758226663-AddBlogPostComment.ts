import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogPostComment1696758226663 implements MigrationInterface {
    name = 'AddBlogPostComment1696758226663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_post_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "blogPostId" uuid NOT NULL, "content" character varying(2048) NOT NULL DEFAULT '', "profileId" integer NOT NULL, CONSTRAINT "PK_8b85d68b277ead82c268316714d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment" ADD CONSTRAINT "FK_04a144f15890ee9f9678be64833" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment" ADD CONSTRAINT "FK_182a1cd7b3453180dafe47d0bff" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_comment" DROP CONSTRAINT "FK_182a1cd7b3453180dafe47d0bff"`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment" DROP CONSTRAINT "FK_04a144f15890ee9f9678be64833"`);
        await queryRunner.query(`DROP TABLE "blog_post_comment"`);
    }
}
