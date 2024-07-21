import { ReactElement, Suspense } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import { NotificationProvider } from "src/core/notifications";
import { ThemeProvider } from "src/core/theme";
import { LoadingView } from "src/views/LoadingView";

import "./App.css";
import { Router } from "./Router";
import { AuthenticationGuard } from "./pages/AuthenticationGuard";
import { QUERY_CLIENT } from "./queryQlient";

export function App(): ReactElement {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider>
        <Suspense fallback={<LoadingView />}>
          <AuthenticationGuard>
            <NotificationProvider>
              <Router />
              <SnackbarProvider dense />
            </NotificationProvider>
          </AuthenticationGuard>
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
