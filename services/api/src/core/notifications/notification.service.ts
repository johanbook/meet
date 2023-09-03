import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";

import { UserIdService } from "src/core/authentication";
import { Logger } from "src/core/logging";
import { OrganizationMembership } from "src/features/organizations/infrastructure/entities/organization-membership.entity";
import { Profile } from "src/features/profiles";

import { EmailService } from "../email/domain/services/email.service";
import { NotificationGateway } from "./notification.gateway";
import { INotification } from "./types";

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationGateway.name);

  constructor(
    private emailService: EmailService,
    private readonly notificationGateway: NotificationGateway,
    @InjectRepository(OrganizationMembership)
    private readonly organizationMemberships: Repository<OrganizationMembership>,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
    private readonly userIdService: UserIdService,
  ) {}

  async notifyOrganization(
    organizationId: number,
    notification: INotification,
    exceptProfilsIds: number[] = [],
  ): Promise<void> {
    const memberships = await this.organizationMemberships.find({
      relations: {
        profile: true,
      },
      where: {
        organizationId,
        profileId: Not(In(exceptProfilsIds)),
      },
    });

    const userIds = memberships.map((membership) => membership.profile.userId);
    await this.notifyUsersIfAvailable(userIds, notification);
  }

  async notifyProfilesIfAvailable(
    profileIds: number[],
    notification: INotification,
  ) {
    const profiles = await this.profiles.find({
      select: ["userId"],
      where: { id: In(profileIds) },
    });

    const ids = profiles.map((profile) => profile.userId);

    await this.notifyUsersIfAvailable(ids, notification);
  }

  async notifyUsersIfAvailable(
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
    this.logger.debug({ msg: "Notifying users via email", userIds });

    const targetEmails = await this.userIdService.fetchUserEmailsByUserIds(
      userIds,
    );

    await this.emailService.sendEmail({
      receivers: targetEmails,
      subject: notification.message,
      text: notification.description,
    });
  }
}
