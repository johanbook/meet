import React from "react";
import { useQuery } from "react-query";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { settingsApi } from "src/apis";

import { createTheme } from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { data } = useQuery(`settings`, () => settingsApi.getCurrentSettings());
  const theme = createTheme(data?.darkmode);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
