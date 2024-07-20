import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotificationSubscription1721483513933 implements MigrationInterface {
    name = 'AddNotificationSubscription1721483513933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification_subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileId" integer NOT NULL, "subscription" json NOT NULL, CONSTRAINT "PK_d5c0b2efb91da0d584fddab9542" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification_subscription" ADD CONSTRAINT "FK_9ce8c93447319240e642238bff4" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_subscription" DROP CONSTRAINT "FK_9ce8c93447319240e642238bff4"`);
        await queryRunner.query(`DROP TABLE "notification_subscription"`);
    }

}
