import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import "./App.css";
import Router from "./Router";
import Theme from "./theme/Theme";

const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Theme>
        <Router />
        <SnackbarProvider dense />
      </Theme>
    </QueryClientProvider>
  );
}
