import { Injectable } from "@nestjs/common";
import { EventBus, IEvent } from "@nestjs/cqrs";

import { Logger } from "./domain/services/logger.service";

@Injectable()
export class EventLogger {
  private logger = new Logger(EventLogger.name);

  constructor(private readonly eventBus: EventBus) {
    this.eventBus.subscribe((event: IEvent) => {
      const eventName = event.constructor.name;
      this.logger.debug({
        args: event,
        event: eventName,
        msg: `Dispatched ${eventName}`,
      });
    });
  }
}
