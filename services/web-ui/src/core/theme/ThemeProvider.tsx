import React from "react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { settingsApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { createTheme } from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { data } = useQuery(CacheKeysConstants.Settings, () =>
    settingsApi.getCurrentSettings()
  );
  const theme = createTheme(data?.darkmode);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
