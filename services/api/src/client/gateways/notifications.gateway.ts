import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ path: "/api/notifications" })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server!: Server;

  private connections: Record<string, Socket> = {};

  handleConnection(socket: Socket): void {
    const userId = this.parseUserIdFromSocket(socket);
    this.connections[userId] = socket;
  }

  handleDisconnect(socket: Socket): void {
    const userId = this.parseUserIdFromSocket(socket);
    delete this.connections[userId];
  }

  @SubscribeMessage("ping")
  ping(@MessageBody() data: unknown): number {
    console.log("\n\nPING\n\n");
    if (data) {
      return 2;
    }

    return 1;
  }

  private notifyUserIfAvailable(
    userId: string,
    type: string,
    message: string,
  ): void {
    const socket = this.connections[userId];

    if (!socket) {
      return;
    }

    socket.emit("notification", { message, type });
  }

  notifyUsersIfAvailable(
    userIds: string[],
    type: string,
    message: string,
  ): void {
    for (const userId in userIds) {
      this.notifyUserIfAvailable(userId, type, message);
    }
  }

  private parseUserIdFromSocket(socket: Socket): string {
    const userId = socket.handshake.headers["x-user-id"];

    if (typeof userId !== "string") {
      throw new WsException("Unable to parse user id");
    }

    return userId;
  }
}
