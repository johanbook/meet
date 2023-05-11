import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import "./App.css";
import Router from "./Router";
import { NotificationProvider } from "./notification.provider";
import Theme from "./theme/Theme";

const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Theme>
        <NotificationProvider>
          <Router />
          <SnackbarProvider dense />
        </NotificationProvider>
      </Theme>
    </QueryClientProvider>
  );
}
