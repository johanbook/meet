import { Socket, io } from "socket.io-client";
import { v4 as uuid } from "uuid";

import { NotificationMetaDetailsWsEventNamesEnum } from "src/api";
import { Logger } from "src/core/logging";

import { dispatchEvent } from "../events";
import { NotificationEventEnum } from "./constants/notification-event.enum";
import { NotificationEvent } from "./notification.event";
import { INotification } from "./types";

const eventName = NotificationMetaDetailsWsEventNamesEnum.Notification;

interface Handler {
  execute: (notification: unknown) => void;
  shouldExecute?: (notification: unknown) => boolean;
}

interface RegisterHandlerProps<
  T extends NotificationEventEnum,
  V extends INotification & { type: T },
> {
  onCondition?: (notification: V) => boolean;
  type: T;
  handler: (notification: V) => void;
}

export class NotificationEventHandler {
  private logger = new Logger(NotificationEventHandler.name);

  private defaultHandler: (notification: INotification) => void;
  private readonly handlers: Record<
    NotificationEventEnum,
    Record<string, Handler>
  > = {
    [NotificationEventEnum.AddedToOrganization]: {},
    [NotificationEventEnum.NewBlogPost]: {},
    [NotificationEventEnum.NewBlogPostComment]: {},
    [NotificationEventEnum.NewChatMessage]: {},
    [NotificationEventEnum.NewTimeSeriesPoint]: {},
  };

  private readonly socket: Socket;

  constructor(defaultHandler: (notification: INotification) => void) {
    this.defaultHandler = defaultHandler;

    this.socket = io(window.location.hostname, {
      path: "/api/notifications/ws",
    });

    this.socket.on(eventName, (notification: INotification) =>
      this.handle(notification),
    );
  }

  public registerHandler<
    T extends NotificationEventEnum,
    V extends INotification & { type: T },
  >({ onCondition, handler, type }: RegisterHandlerProps<T, V>): string {
    const id = uuid();

    const handlersByType = this.handlers[type] as Record<string, Handler>;

    handlersByType[id] = {
      execute: handler as (notification: unknown) => void,
      shouldExecute: onCondition as (notification: unknown) => boolean,
    };

    return id;
  }

  public unregisterHandler(type: NotificationEventEnum, id: string): void {
    delete this.handlers[type][id];
  }

  private handle(notification: INotification): void {
    const handlers = Object.values(this.handlers[notification.type]);

    this.logger.trace("Received notification", { notification });

    const event = new NotificationEvent(notification);
    dispatchEvent(event);

    let eventWasHandled = false;

    for (const handler of handlers) {
      if (
        handler.shouldExecute &&
        handler.shouldExecute(notification) === false
      ) {
        continue;
      }

      handler.execute(notification);

      eventWasHandled = true;
    }

    if (!eventWasHandled) {
      this.defaultHandler(notification);
    }
  }
}
