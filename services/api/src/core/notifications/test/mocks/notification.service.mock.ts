import { NotificationService } from "../../domain/services/notification.service";

class NotificationServiceMock {}

export function createNotificationServiceMock(): NotificationService {
  return new NotificationServiceMock() as any;
}
