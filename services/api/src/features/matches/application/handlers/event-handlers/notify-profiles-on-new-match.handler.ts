import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import {
  NotificationEventsConstants,
  NotificationService,
} from "src/core/notifications";

import { MatchMadeEvent } from "../../../domain/events/match-made.event";

@EventsHandler(MatchMadeEvent)
export class NotifyProfilesOnNewMatch implements IEventHandler<MatchMadeEvent> {
  constructor(private readonly notificationService: NotificationService) {}

  handle(event: MatchMadeEvent) {
    this.notificationService.notifyProfilesIfAvailable(
      [event.swipedProfileId, event.swipingProfileId],
      {
        description: "There was a match",
        message: "You got a new match",
        type: NotificationEventsConstants.NEW_MATCH,
      },
    );
  }
}
