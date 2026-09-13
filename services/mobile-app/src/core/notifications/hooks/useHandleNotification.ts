import { useEffect } from "react";

import { NotificationEventEnum } from "../constants/notification-event.enum";
import {
  NotificationProvider,
  useNotificationHandler,
} from "../notification.provider";
import { INotification } from "../types";

export { NotificationProvider };

interface UseHandleNotificationProps<T extends NotificationEventEnum> {
  onCondition?: (notification: INotification & { type: T }) => boolean;
  onNotification: (notification: INotification & { type: T }) => void;
  type: T;
}

export function useHandleNotification<T extends NotificationEventEnum>({
  onCondition,
  onNotification,
  type,
}: UseHandleNotificationProps<T>): void {
  const handler = useNotificationHandler();

  useEffect(() => {
    const id = handler.registerHandler({
      type,
      handler: onNotification,
      onCondition,
    });

    return () => handler.unregisterHandler(type, id);
  }, [handler, onCondition, onNotification, type]);
}