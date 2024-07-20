import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PushSubscription } from "web-push";

import { NotificationSubscription } from "../../infrastructure/entities/notification-subscription.entity";

@Injectable()
export class NotificationSubscriptionService {
  constructor(
    @InjectRepository(NotificationSubscription)
    private readonly notificationSubscriptions: Repository<NotificationSubscription>,
  ) {}

  async getSubscription(
    profileId: number,
  ): Promise<PushSubscription | undefined> {
    const notificationSubscription =
      await this.notificationSubscriptions.findOne({
        where: { profileId },
      });

    if (!notificationSubscription) {
      return;
    }

    return notificationSubscription.subscription as unknown as PushSubscription;
  }

  async saveSubscription(profileId: number, subscription: PushSubscription) {
    let notificationSubscription = await this.notificationSubscriptions.findOne(
      {
        where: { profileId },
      },
    );

    if (!notificationSubscription) {
      notificationSubscription = new NotificationSubscription();
      notificationSubscription.profileId = profileId;
    }

    notificationSubscription.subscription = subscription;
    await this.notificationSubscriptions.save(notificationSubscription);
  }
}
