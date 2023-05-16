import { Injectable } from "@nestjs/common";
import { EventBus, IEvent } from "@nestjs/cqrs";

import { Logger } from "src/infrastructure/logger.service";

@Injectable()
export class EventLogger {
  private logger = new Logger(EventLogger.name);

  constructor(private readonly eventBus: EventBus) {
    this.eventBus.subscribe((event: IEvent) => {
      this.logger.debug({
        event,
        msg: `Dispatched ${event.constructor.name}`,
      });
    });
  }
}
