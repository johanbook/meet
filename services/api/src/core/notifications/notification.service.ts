import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Profile } from "src/features/profiles";

import { EmailService } from "../email/domain/services/email.service";
import { NotificationGateway } from "./notification.gateway";
import { INotification } from "./types";

@Injectable()
export class NotificationService {
  constructor(
    private emailService: EmailService,
    private readonly notificationGateway: NotificationGateway,
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  async notifyProfilesIfAvailable(
    profileIds: number[],
    notification: INotification,
  ) {
    const profiles = await this.profiles.find({
      select: ["userId"],
      where: { id: In(profileIds) },
    });

    const ids = profiles.map((profile) => profile.userId);

    this.notificationGateway.notifyUsersIfAvailable(ids, notification);
  }

  notifyUsersIfAvailable(userIds: string[], notification: INotification): void {
    const result = this.notificationGateway.notifyUsersIfAvailable(
      userIds,
      notification,
    );

    const usersToBeNotifiedByEmail = Object.entries(result)
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      .filter(([_, wasNotified]) => !wasNotified)
      .map(([userId]) => userId);

    this.notifyUsersByEmail(usersToBeNotifiedByEmail, notification);
  }

  async notifyUsersByEmail(
    userIds: string[],
    notification: INotification,
  ): Promise<void> {
    // TODO: Lookup
    const targetEmails = [""];

    await this.emailService.sendEmail({
      receivers: targetEmails,
      subject: notification.message,
      text: "",
    });
  }
}
