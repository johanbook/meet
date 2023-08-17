import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@mui/material/CssBaseline";
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
      retry: 1,
    },
  },
});

export function App(): React.ReactElement {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider>
        <CssBaseline />
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
