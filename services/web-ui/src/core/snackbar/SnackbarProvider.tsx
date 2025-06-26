import { FC } from "react";

import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";

export const SnackbarProvider: FC = () => {
  return <NotistackSnackbarProvider dense />;
};
