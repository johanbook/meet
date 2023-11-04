import { ReactElement } from "react";
import { QueryClientProvider } from "react-query";

import { SnackbarProvider } from "notistack";

import { NotificationProvider } from "src/core/notifications";
import { ThemeProvider } from "src/core/theme";

import "./App.css";
import { Router } from "./Router";
import { AuthenticationGuard } from "./pages/AuthenticationGuard";
import { QUERY_CLIENT } from "./queryQlient";

export function App(): ReactElement {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider>
        <AuthenticationGuard>
          <NotificationProvider>
            <Router />
            <SnackbarProvider dense />
          </NotificationProvider>
        </AuthenticationGuard>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
