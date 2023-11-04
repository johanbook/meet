import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WsException,
} from "@nestjs/websockets";
import { Socket } from "socket.io";

import { Logger } from "src/core/logging";

import { map } from "../mapper";
import {
  NotificationEventNames,
  WebSocketNotificationDetail,
} from "./application/contracts/dtos/notification-meta.dto";
import { INotification } from "./types";

@WebSocketGateway({ path: "/api/notifications" })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private connections: Record<string, Socket> = {};
  private readonly logger = new Logger(NotificationGateway.name);

  handleConnection(socket: Socket): void {
    const userId = this.parseUserIdFromSocket(socket);
    this.connections[userId] = socket;
  }

  handleDisconnect(socket: Socket): void {
    const userId = this.parseUserIdFromSocket(socket);
    delete this.connections[userId];
  }

  notifyUsersIfAvailable(
    userIds: string[],
    notification: INotification,
  ): Record<string, boolean> {
    const results: Record<string, boolean> = {};

    for (const userId of userIds) {
      const succeeded = this.notifyUserIfAvailable(userId, notification);
      results[userId] = succeeded;
    }

    return results;
  }

  private notifyUserIfAvailable(
    userId: string,
    notification: INotification,
  ): boolean {
    const socket = this.connections[userId];

    if (!socket) {
      this.logger.debug(
        `Unable to find active socket for user id. Skipping notification.`,
        {
          targetUserId: userId,
        },
      );

      return false;
    }

    const notificationDto = map(WebSocketNotificationDetail, notification);

    socket.emit(NotificationEventNames.Notification, notificationDto);

    return true;
  }

  private parseUserIdFromSocket(socket: Socket): string {
    const userId = socket.handshake.headers["x-user-id"];

    if (typeof userId !== "string") {
      throw new WsException("Unable to parse user id");
    }

    return userId;
  }
}
