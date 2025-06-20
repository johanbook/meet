import { ReactNode } from "react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { createTheme } from "./theme";

const DARKMODE_CACHE_KEY = "darkmode-cache";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = createTheme(Boolean(localStorage.getItem(DARKMODE_CACHE_KEY)));

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
