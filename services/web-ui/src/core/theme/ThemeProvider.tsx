import { ReactNode } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { settingsApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { createTheme } from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { data } = useQuery({
    queryKey: [CacheKeysConstants.Settings],
    queryFn: () => settingsApi.getCurrentSettings(),
  });
  const theme = createTheme(data?.darkmode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
