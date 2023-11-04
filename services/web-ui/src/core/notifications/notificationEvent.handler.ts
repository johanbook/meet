import { Socket, io } from "socket.io-client";
import { v4 as uuid } from "uuid";

import { Logger } from "src/core/logging";

import { NotificationEventsConstants } from "./constants/notification-events.constants";
import { INotification } from "./types/notification.interface";

interface Handler {
  execute: (notification: unknown) => void;
  shouldExecute?: (notification: unknown) => boolean;
}

interface RegisterHandlerProps<
  T extends NotificationEventsConstants,
  V extends INotification & { type: T }
> {
  onCondition?: (notification: V) => boolean;
  type: T;
  handler: (notification: V) => void;
}

export class NotificationEventHandler {
  private logger = new Logger(NotificationEventHandler.name);

  private defaultHandler: (notification: INotification) => void;
  private readonly handlers: Record<
    NotificationEventsConstants,
    Record<string, Handler>
  > = {
    [NotificationEventsConstants.ADDED_TO_ORGANIZATION]: {},
    [NotificationEventsConstants.NEW_BLOG_POST]: {},
    [NotificationEventsConstants.NEW_BLOG_POST_COMMENT]: {},
    [NotificationEventsConstants.NEW_CHAT_MESSAGE]: {},
  };

  private readonly socket: Socket;

  constructor(defaultHandler: (notification: INotification) => void) {
    this.defaultHandler = defaultHandler;

    this.socket = io(window.location.hostname, {
      path: "/api/notifications/ws",
    });

    this.socket.on("notification", (notification: INotification) =>
      this.handle(notification)
    );
  }

  public registerHandler<
    T extends NotificationEventsConstants,
    V extends INotification & { type: T }
  >({ onCondition, handler, type }: RegisterHandlerProps<T, V>): string {
    const id = uuid();

    const handlersByType = this.handlers[type] as Record<string, Handler>;

    handlersByType[id] = {
      execute: handler as (notification: unknown) => void,
      shouldExecute: onCondition as (notification: unknown) => boolean,
    };

    return id;
  }

  public unregisterHandler(
    type: NotificationEventsConstants,
    id: string
  ): void {
    delete this.handlers[type][id];
  }

  private handle(notification: INotification): void {
    const handlers = Object.values(this.handlers[notification.type]);

    this.logger.trace("Received notification", { notification });

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
