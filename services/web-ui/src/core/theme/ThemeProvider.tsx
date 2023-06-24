import React from "react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { createTheme } from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = createTheme();
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
