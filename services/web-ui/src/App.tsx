import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { SnackbarProvider } from "notistack";

import { Logger } from "src/core/logging";
import { NotificationProvider } from "src/core/notifications";
import { ThemeProvider } from "src/core/theme";

import "./App.css";
import { Router } from "./Router";
import { AuthenticationGuard } from "./pages/AuthenticationGuard";

const logger = new Logger(QueryClient.name);

const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (err) => {
        const error = err as Error;
        logger.error("Failed to execute mutation", {
          error: {
            message: error.message,
            stackTrace: error.stack,
          },
        });
      },
    },
    queries: {
      onError: (err) => {
        const error = err as Error;
        logger.error("Failed to execute query", {
          error: {
            message: error.message,
            stackTrace: error.stack,
          },
        });
      },
      // Limit retries
      retry: 1,
      // Consider data to be fresh for 20 seconds
      staleTime: 20 * 1000,
    },
  },
});

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
