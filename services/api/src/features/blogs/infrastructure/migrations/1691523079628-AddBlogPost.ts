import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBlogPost1691523079628 implements MigrationInterface {
    name = 'AddBlogPost1691523079628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying(2048) NOT NULL DEFAULT '', "organizationId" integer NOT NULL, "profileId" integer NOT NULL, CONSTRAINT "PK_694e842ad1c2b33f5939de6fede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_5e268dc00df2ba14bfb0381dc99" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_post" ADD CONSTRAINT "FK_5fc410996103f64f5d16c423918" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_5fc410996103f64f5d16c423918"`);
        await queryRunner.query(`ALTER TABLE "blog_post" DROP CONSTRAINT "FK_5e268dc00df2ba14bfb0381dc99"`);
        await queryRunner.query(`DROP TABLE "blog_post"`);
    }

}
