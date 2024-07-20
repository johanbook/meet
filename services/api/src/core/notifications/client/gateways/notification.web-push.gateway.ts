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

  private async sendWebPushToProfile(
    profileId: number,
    notification: INotification,
  ): Promise<boolean> {
    const pushSubscription =
      this.notificationSubscriptionService.getSubscription(profileId);

    if (!pushSubscription) {
      return false;
    }

    const result = await sendNotification(
      pushSubscription,
      JSON.stringify(notification),
    );

    return result.statusCode < 400;
  }

  public async sendWebPush(
    profileIds: number[],
    notification: INotification,
  ): Promise<Record<number, boolean>> {
    const result: Record<number, boolean> = {};

    for (const profileId of profileIds) {
      await this.sendWebPushToProfile(profileId, notification);
    }

    return result;
  }
}
