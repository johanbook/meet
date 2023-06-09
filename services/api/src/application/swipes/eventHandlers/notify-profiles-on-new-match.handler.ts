import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { NotificationEventsConstants } from "src/constants/notification-events.constants";
import { NotificationService } from "src/core/notifications";
import { MatchMadeEvent } from "src/domain/swipes/events/match-made.event";

@EventsHandler(MatchMadeEvent)
export class NotifyProfilesOnNewMatch implements IEventHandler<MatchMadeEvent> {
  constructor(private readonly notificationService: NotificationService) {}

  handle(event: MatchMadeEvent) {
    this.notificationService.notifyProfilesIfAvailable(
      [event.swipedProfileId, event.swipingProfileId],
      {
        message: "You got a new match",
        type: NotificationEventsConstants.NEW_MATCH,
      },
    );
  }
}
