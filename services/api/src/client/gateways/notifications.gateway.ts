import { InjectRepository } from "@nestjs/typeorm";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WsException,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { In, Repository } from "typeorm";

import { NotificationEventsConstants } from "src/constants/notification-events.constants";
import { Profile } from "src/infrastructure/database/entities/profile.entity";
import { Logger } from "src/infrastructure/logger.service";

type NotificationData = Record<string, number | string>;

type INotification = {
  data?: NotificationData;
  message: string;
  type: NotificationEventsConstants;
};

@WebSocketGateway({ path: "/api/notifications" })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private connections: Record<string, Socket> = {};
  private readonly logger = new Logger(NotificationsGateway.name);

  constructor(
    @InjectRepository(Profile)
    private readonly profiles: Repository<Profile>,
  ) {}

  handleConnection(socket: Socket): void {
    const userId = this.parseUserIdFromSocket(socket);
    this.connections[userId] = socket;
  }

  handleDisconnect(socket: Socket): void {
    const userId = this.parseUserIdFromSocket(socket);
    delete this.connections[userId];
  }

  async notifyProfilesIfAvailable(
    profileIds: number[],
    notification: INotification,
  ) {
    const profiles = await this.profiles.find({
      select: ["userId"],
      where: { id: In(profileIds) },
    });

    const ids = profiles.map((profile) => profile.userId);

    this.notifyUsersIfAvailable(ids, notification);
  }

  notifyUsersIfAvailable(userIds: string[], notification: INotification): void {
    for (const userId of userIds) {
      this.notifyUserIfAvailable(userId, notification);
    }
  }

  private notifyUserIfAvailable(
    userId: string,
    { data = {}, message, type }: INotification,
  ): void {
    const socket = this.connections[userId];

    if (!socket) {
      this.logger.debug({
        msg: `Unable to find active socket for user id. Skipping notification.`,
        targetUserId: userId,
      });
      return;
    }

    socket.emit("notification", { data, message, type });
  }

  private parseUserIdFromSocket(socket: Socket): string {
    const userId = socket.handshake.headers["x-user-id"];

    if (typeof userId !== "string") {
      throw new WsException("Unable to parse user id");
    }

    return userId;
  }
}
