import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import "./App.css";
import { Router } from "./Router";
import { NotificationProvider } from "./notification.provider";
import { AuthenticationGuard } from "./pages/AuthenticationGuard";
import Theme from "./theme/Theme";

const QUERY_CLIENT = new QueryClient();

export function App(): React.ReactElement {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <CssBaseline />
      <Theme>
        <AuthenticationGuard>
          <NotificationProvider>
            <Router />
            <SnackbarProvider dense />
          </NotificationProvider>
        </AuthenticationGuard>
      </Theme>
    </QueryClientProvider>
  );
}
