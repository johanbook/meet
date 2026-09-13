import { BaseEvent } from "src/core/events";

import { INotification } from "./types";

export class NotificationEvent extends BaseEvent {
  constructor(public readonly notification: INotification) {
    super();
  }
}
