import { NotificationService } from "../../domain/services/notification.service";

/* eslint-disable unicorn/consistent-function-scoping */

class NotificationServiceMock {}

export function createNotificationServiceMock(): NotificationService {
  return new NotificationServiceMock() as any;
}
