import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import "./App.css";
import { Router } from "./Router";
import { NotificationProvider } from "./core/notifications";
import { ThemeProvider } from "./core/theme";
import { Logger } from "./logger";
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
        logger.error("Failed to execute mutation", {
          error: {
            message: error.message,
            stackTrace: error.stack,
          },
        });
      },
      retry: 1,
    },
  },
});

export function App(): React.ReactElement {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <CssBaseline />
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
