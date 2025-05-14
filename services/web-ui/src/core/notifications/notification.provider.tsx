import { ReactElement, ReactNode, createContext, useState } from "react";

import { useSnackbar } from "src/core/snackbar";

import { NotificationEventHandler } from "./notificationEvent.handler";

export const NotificationContext = createContext<
  NotificationEventHandler | undefined
>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({
  children,
}: NotificationProviderProps): ReactElement {
  const snackbar = useSnackbar();

  const notificationHandler = useState(() => {
    return new NotificationEventHandler(({ message }) =>
      snackbar.info(message),
    );
  })[0];

  return (
    <NotificationContext.Provider value={notificationHandler}>
      {children}
    </NotificationContext.Provider>
  );
}
