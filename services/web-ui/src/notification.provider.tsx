import React from "react";

import { useSnackbar } from "./hooks/useSnackbar";
import { NotificationEventHandler } from "./utils/notificationEvent.handler";

export const NotificationContext = React.createContext<
  NotificationEventHandler | undefined
>(undefined);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({
  children,
}: NotificationProviderProps): React.ReactElement {
  const snackbar = useSnackbar();

  const notificationHandler = React.useState(() => {
    return new NotificationEventHandler(({ message }) =>
      snackbar.info(message)
    );
  })[0];

  return (
    <NotificationContext.Provider value={notificationHandler}>
      {children}
    </NotificationContext.Provider>
  );
}
