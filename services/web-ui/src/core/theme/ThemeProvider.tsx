import { ReactNode, useEffect } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { organizationsApi, settingsApi } from "src/apis";
import { CacheKeysConstants, useQuery } from "src/core/query";

import { createTheme } from "./theme";

const DARKMODE_CACHE_KEY = "darkmode-cache";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { data } = useQuery({
    queryKey: [CacheKeysConstants.Settings],
    queryFn: () => settingsApi.getCurrentSettings(),
  });

  const organizationQuery = useQuery({
    queryKey: [CacheKeysConstants.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  const darkmode =
    data?.darkmode ?? Boolean(localStorage.getItem(DARKMODE_CACHE_KEY));

  const organizationTheme = organizationQuery.data?.theme || "default";

  const theme = createTheme({
    darkmode,
    theme: organizationTheme,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.darkmode) {
      localStorage.setItem(DARKMODE_CACHE_KEY, "true");
    } else {
      localStorage.removeItem(DARKMODE_CACHE_KEY);
    }
  }, [data]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
