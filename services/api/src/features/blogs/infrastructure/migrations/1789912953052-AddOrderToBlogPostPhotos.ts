import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderToBlogPostPhotos1789912953052 implements MigrationInterface {
    name = 'AddOrderToBlogPostPhotos1789912953052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD "order" integer`);
        await queryRunner.query(`UPDATE "blog_post_photo" SET "order" = ranked."order" FROM (SELECT "id", row_number() OVER (PARTITION BY "blogPostId" ORDER BY "createdAt", "id") - 1 AS "order" FROM "blog_post_photo") ranked WHERE "blog_post_photo"."id" = ranked."id"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ALTER COLUMN "order" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_blog_post_photo_blogPostId_order" ON "blog_post_photo" ("blogPostId", "order")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "UQ_blog_post_photo_blogPostId_order"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP COLUMN "order"`);
    }

}