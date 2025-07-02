import { Injectable } from "@nestjs/common";
import { sendNotification, setVapidDetails } from "web-push";

import { Logger } from "src/core/logging";
import { getRequiredStringConfig } from "src/utils/config.helper";

import { NotificationSubscriptionService } from "../../domain/services/notification-subscription.service";
import { INotification } from "../../types";

@Injectable()
export class NotificationWebPushGateway {
  private logger = new Logger(NotificationWebPushGateway.name);

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
      await this.notificationSubscriptionService.getSubscription(profileId);

    if (!pushSubscription) {
      return false;
    }

    try {
      const result = await sendNotification(
        pushSubscription.subscription,
        JSON.stringify(notification),
      );

      return result.statusCode < 400;
    } catch (error) {
      this.logger.error(
        "Unable to send push notification. This notification subscription will be removed",
        {
          error,
          notification,
        },
      );

      await this.notificationSubscriptionService.deleteSubscription(
        pushSubscription.id,
      );

      return false;
    }
  }

  public async sendWebPush(
    profileIds: number[],
    notification: INotification,
  ): Promise<Record<number, boolean>> {
    const result: Record<number, boolean> = {};

    for (const profileId of profileIds) {
      result[profileId] = await this.sendWebPushToProfile(
        profileId,
        notification,
      );
    }

    return result;
  }
}
