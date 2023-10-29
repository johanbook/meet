import { ReactNode } from "react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { createTheme } from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = createTheme(false);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
