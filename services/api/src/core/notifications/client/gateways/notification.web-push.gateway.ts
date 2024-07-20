import { Injectable } from "@nestjs/common";
import { sendNotification, setVapidDetails } from "web-push";

import { getRequiredStringConfig } from "src/utils/config.helper";

import { NotificationSubscriptionService } from "../../domain/services/notification-subscription.service";
import { INotification } from "../../types";

@Injectable()
export class NotificationWebPushGateway {
  constructor(
    private readonly notificationSubscriptionService: NotificationSubscriptionService,
  ) {
    setVapidDetails(
      `mailto:${getRequiredStringConfig("EMAIL")}`,
      getRequiredStringConfig("VAPID_PUBLIC_KEY"),
      getRequiredStringConfig("VAPID_PRIVATE_KEY"),
    );
  }

  public async sendWebPush(profileId: number, notification: INotification) {
    const pushSubscription =
      this.notificationSubscriptionService.getSubscription(profileId);

    if (!pushSubscription) {
      return;
    }

    await sendNotification(pushSubscription, JSON.stringify(notification));
  }
}
