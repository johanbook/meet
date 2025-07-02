import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { EmailService } from "src/core/email/domain/services/email.service";
import { Logger } from "src/core/logging";
import { OrganizationMembership } from "src/core/organizations/infrastructure/entities/organization-membership.entity";
import { Profile } from "src/core/profiles";
import { getRequiredStringConfig } from "src/utils/config.helper";

import { NotificationGateway } from "../../client/gateways/notification.gateway";
import { NotificationWebPushGateway } from "../../client/gateways/notification.web-push.gateway";
import { Notification } from "../../infrastructure/entities/notification.entity";
import { INotification } from "../../types";

const UI_DOMAIN = getRequiredStringConfig("UI_DOMAIN");

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationGateway.name);

  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(Notification)
    private readonly notifications: Repository<Notification>,
    private readonly notificationGateway: NotificationGateway,
    private readonly notificationWebPushGateway: NotificationWebPushGateway,
    @InjectRepository(OrganizationMembership)
    private readonly organizationMemberships: Repository<OrganizationMembership>,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  /** Sends notification to all members of an organization */
  async notifyOrganization(
    organizationId: number,
    notification: INotification,
    ignoredProfileIds: number[] = [],
  ): Promise<void> {
    const memberships = await this.organizationMemberships.find({
      relations: {
        profile: true,
      },
      where: {
        organizationId,
        profileId: Not(In(ignoredProfileIds)),
      },
    });

    const newNotifications = memberships.map((membership) => {
      const newNotification = new Notification();
      newNotification.description = notification.description;
      newNotification.message = notification.message;
      newNotification.organizationId = organizationId;
      newNotification.profileId = membership.profileId;
      newNotification.read = false;
      newNotification.resourcePath = notification.resourcePath;
      newNotification.type = notification.type;

      return newNotification;
    });
    await this.notifications.save(newNotifications);

    const profileIds = memberships.map((membership) => membership.profile.id);
    const webPushResult = await this.notificationWebPushGateway.sendWebPush(
      profileIds,
      notification,
    );

    // Get list of user ids where a web push wes not sent
    const userIds = memberships
      .filter((membership) => !webPushResult[membership.profileId])
      .map((membership) => membership.profile.userId);

    await this.notifyUsers(userIds, notification);
  }

  /** Sends notification to profiles */
  async notifyProfiles(profileIds: number[], notification: INotification) {
    const profiles = await this.profiles.find({
      select: ["userId"],
      where: { id: In(profileIds) },
    });

    // TODO: Do not send web push if web socket succeded
    await this.notificationWebPushGateway.sendWebPush(profileIds, notification);

    const ids = profiles.map((profile) => profile.userId);

    await this.notifyUsers(ids, notification);
  }

  async notifyUsers(
    userIds: string[],
    notification: INotification,
  ): Promise<void> {
    const result = this.notificationGateway.notifyUsersIfAvailable(
      userIds,
      notification,
    );

    const usersToBeNotifiedByEmail = Object.entries(result)
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      .filter(([_, wasNotified]) => !wasNotified)
      .map(([userId]) => userId);

    if (usersToBeNotifiedByEmail.length > 0) {
      await this.notifyUsersByEmail(usersToBeNotifiedByEmail, notification);
    }
  }

  async notifyUsersByEmail(
    userIds: string[],
    notification: INotification,
  ): Promise<void> {
    this.logger.debug("Notifying users via email", { userIds });

    const targetEmails =
      await this.userIdService.fetchUserEmailsByUserIds(userIds);

    await this.emailService.sendEmail({
      receivers: targetEmails,
      subject: notification.message,
      text: notification.description,
      url: UI_DOMAIN + notification.resourcePath,
    });
  }
}
