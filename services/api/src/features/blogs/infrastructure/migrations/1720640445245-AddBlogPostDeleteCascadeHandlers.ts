import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogPostDeleteCascadeHandlers1720640445245 implements MigrationInterface {
    name = 'AddBlogPostDeleteCascadeHandlers1720640445245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP CONSTRAINT "FK_663877f57c851f804fc6bb9a881"`);
        await queryRunner.query(`ALTER TABLE "blog_post_reaction" DROP CONSTRAINT "FK_11e0938003df1680e02080fca6a"`);
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_5fc410996103f64f5d16c423918"`);
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_5e268dc00df2ba14bfb0381dc99"`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment" DROP CONSTRAINT "FK_182a1cd7b3453180dafe47d0bff"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP CONSTRAINT "FK_c6412cba4a5c0a36761adaef490"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ALTER COLUMN "blogPostId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD CONSTRAINT "FK_c6412cba4a5c0a36761adaef490" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD CONSTRAINT "FK_663877f57c851f804fc6bb9a881" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_reaction" ADD CONSTRAINT "FK_11e0938003df1680e02080fca6a" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_5e268dc00df2ba14bfb0381dc99" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_5fc410996103f64f5d16c423918" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment" ADD CONSTRAINT "FK_182a1cd7b3453180dafe47d0bff" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_comment" DROP CONSTRAINT "FK_182a1cd7b3453180dafe47d0bff"`);
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_5fc410996103f64f5d16c423918"`);
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_5e268dc00df2ba14bfb0381dc99"`);
        await queryRunner.query(`ALTER TABLE "blog_post_reaction" DROP CONSTRAINT "FK_11e0938003df1680e02080fca6a"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP CONSTRAINT "FK_663877f57c851f804fc6bb9a881"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP CONSTRAINT "FK_c6412cba4a5c0a36761adaef490"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ALTER COLUMN "blogPostId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD CONSTRAINT "FK_c6412cba4a5c0a36761adaef490" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_comment" ADD CONSTRAINT "FK_182a1cd7b3453180dafe47d0bff" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_5e268dc00df2ba14bfb0381dc99" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_5fc410996103f64f5d16c423918" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_reaction" ADD CONSTRAINT "FK_11e0938003df1680e02080fca6a" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD CONSTRAINT "FK_663877f57c851f804fc6bb9a881" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
