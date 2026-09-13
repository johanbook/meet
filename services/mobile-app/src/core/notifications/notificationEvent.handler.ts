import { config } from "src/config";
import { NotificationMetaDetailsWsEventNamesEnum } from "src/api";

import { io, Socket } from "socket.io-client";

import { dispatchEvent } from "src/core/events";
import { Logger } from "src/core/logging";

import { NotificationEventEnum } from "./constants/notification-event.enum";
import { NotificationEvent } from "./notification.event";
import { INotification } from "./types";

interface Handler {
  execute: (notification: unknown) => void;
  shouldExecute?: (notification: unknown) => boolean;
}

// RN does not ship a spec-compliant URL class; derive the origin without one.
function websocketOrigin(): string {
  const base = config.API.BASE_URL;
  const schemeEnd = base.indexOf("://");

  if (schemeEnd === -1) {
    return base;
  }

  const afterScheme = base.slice(schemeEnd + 3);
  const pathStart = afterScheme.indexOf("/");

  const host = pathStart === -1 ? afterScheme : afterScheme.slice(0, pathStart);

  return `${base.slice(0, schemeEnd + 3)}${host}`;
}

const logger = new Logger("Notifications");

export class NotificationEventHandler {
  private handlers: Record<string, Record<string, Handler>> = {
    added_to_organization: {},
    new_blog_post: {},
    new_blog_post_comment: {},
    new_chat_message: {},
    new_time_series_point: {},
  };

  private nextHandlerId = 0;

  private readonly socket: Socket;

  constructor(
    private readonly defaultHandler: (notification: INotification) => void,
  ) {
    // RN does not ship a WebSocket global today; when no transport is
    // available the socket fails closed and realtime notifications degrade
    // (queries still refresh on mutations).
    this.socket = io(websocketOrigin(), {
      path: "/api/notifications/ws",
    });

    this.socket.on("connect_error", (error) => {
      logger.warn("Websocket connection failed", { message: String(error) });
    });

    this.socket.on(
      NotificationMetaDetailsWsEventNamesEnum.Notification,
      (notification: INotification) => {
        this.handle(notification);
      },
    );
  }

  private handle(notification: INotification): void {
    const event = notification as INotification | undefined;

    if (!event) {
      return;
    }

    dispatchEvent(new NotificationEvent(event));

    let handlerDidRun = false;

    for (const handler of Object.values(this.handlers[event.type] || {})) {
      if (handler.shouldExecute && handler.shouldExecute(event) === false) {
        continue;
      }

      handler.execute(event);
      handlerDidRun = true;
    }

    if (!handlerDidRun) {
      this.defaultHandler(event);
    }
  }

  registerHandler<T extends NotificationEventEnum>({
    type,
    handler,
    onCondition,
  }: {
    type: T;
    handler: (notification: INotification & { type: T }) => void;
    onCondition?: (notification: INotification & { type: T }) => boolean;
  }): string {
    const id = String(this.nextHandlerId++);

    this.handlers[type][id] = {
      execute: handler as (notification: unknown) => void,
      shouldExecute: onCondition as
        | undefined
        | ((notification: unknown) => boolean),
    };

    return id;
  }

  unregisterHandler(type: NotificationEventEnum, id: string): void {
    delete this.handlers[type][id];
  }

  close(): void {
    this.socket.close();
  }
}