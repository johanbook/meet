import { MigrationInterface, QueryRunner } from "typeorm";

export class SetCascaseDeleteOptionOnBlogPostPhotos1695500882646 implements MigrationInterface {
    name = 'SetCascaseDeleteOptionOnBlogPostPhotos1695500882646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP CONSTRAINT "FK_c6412cba4a5c0a36761adaef490"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD CONSTRAINT "FK_c6412cba4a5c0a36761adaef490" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP CONSTRAINT "FK_c6412cba4a5c0a36761adaef490"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD CONSTRAINT "FK_c6412cba4a5c0a36761adaef490" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
