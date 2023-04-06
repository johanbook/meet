import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@mui/material/CssBaseline";

import Router from "./Router";
import Theme from "./theme/Theme";

const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Theme>
        <Router />
      </Theme>
    </QueryClientProvider>
  );
}
