import { useContext, useEffect } from "react";

import { NotificationEventEnum } from "../constants/notification-event.enum";
import { NotificationContext } from "../notification.provider";
import { INotification } from "../types";

interface UseHandleNotificationProps<
  T extends NotificationEventEnum,
  V extends INotification & { type: T },
> {
  onCondition?: (notification: V) => boolean;
  onNotification: (notification: V) => void;
  type: T;
}

export function useHandleNotification<
  T extends NotificationEventEnum,
  V extends INotification & { type: T },
>({
  onCondition,
  onNotification,
  type,
}: UseHandleNotificationProps<T, V>): void {
  const notificationHandler = useContext(NotificationContext);

  useEffect(() => {
    if (!notificationHandler) {
      throw new Error(
        "Unable to register notification handler. Make sure the NotificationProvider is correctly setup.",
      );
    }

    const id = notificationHandler.registerHandler({
      onCondition,
      handler: onNotification,
      type,
    });

    return () => {
      notificationHandler.unregisterHandler(type, id);
    };
    /** Effect should not trigger on notification handler changes
     * Ignore is added to avoid needing to use refs or `React.useCallback` */
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [type]);
}
