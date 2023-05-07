import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WsException,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { In, Repository } from "typeorm";

import { Profile } from "src/infrastructure/database/entities/profile.entity";

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
    type: string,
    message: string,
  ) {
    const profiles = await this.profiles.find({
      select: ["userId"],
      where: { id: In(profileIds) },
    });

    const ids = profiles.map((profile) => profile.userId);

    this.notifyUsersIfAvailable(ids, type, message);
  }

  notifyUsersIfAvailable(
    userIds: string[],
    type: string,
    message: string,
  ): void {
    for (const userId of userIds) {
      this.notifyUserIfAvailable(userId, type, message);
    }
  }

  private notifyUserIfAvailable(
    userId: string,
    type: string,
    message: string,
  ): void {
    const socket = this.connections[userId];

    if (!socket) {
      this.logger.debug(
        `Unable to find active socket for user id '${userId}'. Skipping sending message.`,
      );
      return;
    }

    socket.emit("notification", { message, type });
  }

  private parseUserIdFromSocket(socket: Socket): string {
    const userId = socket.handshake.headers["x-user-id"];

    if (typeof userId !== "string") {
      throw new WsException("Unable to parse user id");
    }

    return userId;
  }
}
