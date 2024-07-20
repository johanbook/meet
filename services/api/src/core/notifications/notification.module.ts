import { Module, forwardRef } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EmailModule } from "src/core/email/email.module";
import { OrganizationMembership } from "src/core/organizations/infrastructure/entities/organization-membership.entity";
import { OrganizationModule } from "src/core/organizations/organization.module";
import { Profile } from "src/core/profiles";
import { ProfileModule } from "src/core/profiles/profile.module";

import { AuthenticationModule } from "../authentication/authentication.module";
import { QueryModule } from "../query/query.module";
import { SaveNotificationSubscriptionHandler } from "./application/handlers/command-handlers/save-notification-subscription.handler";
import { GetNotificationListHandler } from "./application/handlers/query-handlers/get-notification-list.handler";
import { NotificationsController } from "./client/controllers/notifications.controller";
import { NotificationGateway } from "./client/gateways/notification.gateway";
import { NotificationWebPushGateway } from "./client/gateways/notification.web-push.gateway";
import { NotificationSubscriptionService } from "./domain/services/notification-subscription.service";
import { NotificationService } from "./domain/services/notification.service";
import { NotificationSubscription } from "./infrastructure/entities/notification-subscription.entity";
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
    TypeOrmModule.forFeature([
      Notification,
      NotificationSubscription,
      OrganizationMembership,
      Profile,
    ]),
  ],
  providers: [
    NotificationGateway,
    GetNotificationListHandler,
    NotificationService,
    NotificationSubscriptionService,
    NotificationWebPushGateway,
    SaveNotificationSubscriptionHandler,
  ],
})
export class NotificationModule {}
