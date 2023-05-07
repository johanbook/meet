import React from "react";

import { Socket, io } from "socket.io-client";

import { useSnackbar } from "./useSnackbar";

export function useSocket(host: string) {
  const [socket, setSocket] = React.useState<Socket>();
  const snackbar = useSnackbar();

  React.useEffect(() => {
    const socket = io(host, { path: "/api/notifications" });

    setSocket(socket);

    socket.emit("ping", "hi");

    socket.on("notification", (message: string) => {
      snackbar.info(message);
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps*/
  }, [host]);

  return socket;
}
