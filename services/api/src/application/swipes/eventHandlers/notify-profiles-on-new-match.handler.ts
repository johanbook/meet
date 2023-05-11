import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { NotificationsGateway } from "src/client/gateways/notifications.gateway";
import { NotificationEventsConstants } from "src/constants/notification-events.constants";
import { MatchMadeEvent } from "src/domain/swipes/events/match-made.event";

@EventsHandler(MatchMadeEvent)
export class NotifyProfilesOnNewMatch implements IEventHandler<MatchMadeEvent> {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  handle(event: MatchMadeEvent) {
    this.notificationsGateway.notifyProfilesIfAvailable(
      [event.swipedProfileId, event.swipingProfileId],
      NotificationEventsConstants.NEW_MATCH,
      "You got a new match",
    );
  }
}
