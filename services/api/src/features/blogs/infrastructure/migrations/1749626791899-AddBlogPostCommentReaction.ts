import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogPostCommentReaction1749626791899 implements MigrationInterface {
    name = 'AddBlogPostCommentReaction1749626791899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_post_comment_reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "blogPostCommentId" uuid NOT NULL, "profileId" integer NOT NULL, "reaction" character varying(8) NOT NULL, CONSTRAINT "UQ_6505aa815e64ffda73fd4455f02" UNIQUE ("blogPostCommentId", "profileId"), CONSTRAINT "PK_161df8b99c9fdefd35267008422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment_reaction" ADD CONSTRAINT "FK_86162f3a90b9a926d5a319fa02c" FOREIGN KEY ("blogPostCommentId") REFERENCES "blog_post_comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment_reaction" ADD CONSTRAINT "FK_908615b2fd2bf1a285f1805eec1" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_comment_reaction" DROP CONSTRAINT "FK_908615b2fd2bf1a285f1805eec1"`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment_reaction" DROP CONSTRAINT "FK_86162f3a90b9a926d5a319fa02c"`);
        await queryRunner.query(`DROP TABLE "blog_post_comment_reaction"`);
    }

}
