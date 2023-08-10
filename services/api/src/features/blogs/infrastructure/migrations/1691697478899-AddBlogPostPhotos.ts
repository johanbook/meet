import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogPostPhotos1691697478899 implements MigrationInterface {
    name = 'AddBlogPostPhotos1691697478899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_post_photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "objectId" uuid NOT NULL, "profileId" integer NOT NULL, "description" character varying(2048) NOT NULL DEFAULT '', "blogPostId" uuid, CONSTRAINT "PK_5362fab55b3dafced22453682f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD CONSTRAINT "FK_663877f57c851f804fc6bb9a881" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" ADD CONSTRAINT "FK_c6412cba4a5c0a36761adaef490" FOREIGN KEY ("blogPostId") REFERENCES "blog_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP CONSTRAINT "FK_c6412cba4a5c0a36761adaef490"`);
        await queryRunner.query(`ALTER TABLE "blog_post_photo" DROP CONSTRAINT "FK_663877f57c851f804fc6bb9a881"`);
        await queryRunner.query(`ALTER TABLE "profile_photo" DROP CONSTRAINT "FK_b0ef739fbbf76e987e2e43017ec"`);
        await queryRunner.query(`DROP TABLE "blog_post_photo"`);
    }

}
