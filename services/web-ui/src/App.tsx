import { ReactElement, Suspense } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { AuthenticationGuard } from "src/core/authentication";
import { NotificationProvider } from "src/core/notifications";
import { SnackbarProvider } from "src/core/snackbar";
import { ThemeProvider } from "src/core/theme";
import { LoadingView } from "src/views/LoadingView";

import "./App.css";
import { Router } from "./Router";
import { QUERY_CLIENT } from "./queryQlient";

export function App(): ReactElement {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider>
        <Suspense fallback={<LoadingView />}>
          <AuthenticationGuard>
            <NotificationProvider>
              <Router />
              <SnackbarProvider />
            </NotificationProvider>
          </AuthenticationGuard>
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
