import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { NotificationSubscriptionService } from "src/core/notifications/domain/services/notification-subscription.service";
import { CurrentProfileService } from "src/core/profiles";

import { SaveNotificationSubscriptionCommand } from "../../contracts/commands/save-notification-subscription.command";

@CommandHandler(SaveNotificationSubscriptionCommand)
export class SaveNotificationSubscriptionHandler
  implements ICommandHandler<SaveNotificationSubscriptionCommand, void>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private readonly notificationSubscriptionService: NotificationSubscriptionService,
  ) {}

  async execute(command: SaveNotificationSubscriptionCommand) {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    this.notificationSubscriptionService.saveSubscription(
      currentProfileId,
      command,
    );
  }
}
