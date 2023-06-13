import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";

import { NotificationGateway } from "./notification.gateway";
import { INotification } from "./types";

@Injectable()
export class NotificationService {
  constructor(
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
    this.notificationGateway.notifyUsersIfAvailable(userIds, notification);
  }
}
