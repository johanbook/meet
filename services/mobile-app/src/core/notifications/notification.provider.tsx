import { ReactNode, createContext, useContext, useState } from "react";

import { INotification } from "src/core/notifications/types";
import { useSnackbar } from "src/core/snackbar";

import { NotificationEventHandler } from "./notificationEvent.handler";

const NotificationContext = createContext<
  NotificationEventHandler | undefined
>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const snackbar = useSnackbar();

  const [handler] = useState(() => {
    const defaultHandler = ({ message }: INotification) => {
      snackbar.info(message);
    };

    return new NotificationEventHandler(defaultHandler);
  });

  return (
    <NotificationContext.Provider value={handler}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationHandler(): NotificationEventHandler {
  const handler = useContext(NotificationContext);

  if (!handler) {
    throw new Error(
      "useNotificationHandler must be used within a NotificationProvider",
    );
  }

  return handler;
}