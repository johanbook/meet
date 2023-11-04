import { Module, forwardRef } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EmailModule } from "src/core/email/email.module";
import { OrganizationMembership } from "src/features/organizations/infrastructure/entities/organization-membership.entity";
import { OrganizationModule } from "src/features/organizations/organization.module";
import { Profile } from "src/features/profiles";
import { ProfileModule } from "src/features/profiles/profile.module";

import { AuthenticationModule } from "../authentication/authentication.module";
import { QueryModule } from "../query/query.module";
import { GetNotificationListHandler } from "./application/handlers/query-handlers/get-notification-list.handler";
import { NotificationsController } from "./client/controllers/notifications.controller";
import { NotificationGateway } from "./client/gateways/notification.gateway";
import { NotificationService } from "./domain/services/notification.service";
import { Notification } from "./infrastructure/entities/notification.entity";

@Module({
  controllers: [NotificationsController],
  exports: [NotificationService],
  imports: [
    forwardRef(() => OrganizationModule),
    forwardRef(() => ProfileModule),
    AuthenticationModule,
    CqrsModule,
    EmailModule,
    QueryModule,
    TypeOrmModule.forFeature([Notification, OrganizationMembership, Profile]),
  ],
  providers: [
    NotificationGateway,
    GetNotificationListHandler,
    NotificationService,
  ],
})
export class NotificationModule {}
