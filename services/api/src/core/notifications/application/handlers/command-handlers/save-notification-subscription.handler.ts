import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PushSubscription } from "web-push";

import { NotificationSubscriptionService } from "src/core/notifications/domain/services/notification-subscription.service";
import { CurrentProfileService } from "src/core/profiles";

import { SaveNotificationSubscriptionCommand } from "../../contracts/commands/save-notification-subscription.command";

@CommandHandler(SaveNotificationSubscriptionCommand)
export class SaveNotificationSubscriptionHandler implements ICommandHandler<
  SaveNotificationSubscriptionCommand,
  void
> {
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly notificationSubscriptionService: NotificationSubscriptionService,
  ) {}

  async execute(command: SaveNotificationSubscriptionCommand) {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const subscription: PushSubscription = {
      endpoint: command.endpoint || "",
      keys: {
        auth: command.keys?.auth || "",
        p256dh: command.keys?.p256dh || "",
      },
    };

    await this.notificationSubscriptionService.saveSubscription(
      currentProfileId,
      subscription,
    );
  }
}
