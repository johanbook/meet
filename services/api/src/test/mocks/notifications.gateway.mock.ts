import { NotificationsGateway } from "src/client/gateways/notifications.gateway";

/* eslint-disable unicorn/consistent-function-scoping */

class NotificationsGatewayMock {}

export function createNotificationsGatewayMock(): NotificationsGateway {
  return new NotificationsGatewayMock() as any;
}
