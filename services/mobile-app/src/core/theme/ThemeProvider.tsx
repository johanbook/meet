import { ReactNode, createContext, useContext, useEffect } from "react";

import { organizationsApi, settingsApi } from "src/apis";
import { storage } from "src/core/storage";
import { CacheKeyEnum, useQuery } from "src/core/query";

import { Theme, createTheme } from "./theme";

const DARKMODE_CACHE_KEY = "darkmode-cache";

const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { data } = useQuery({
    queryKey: [CacheKeyEnum.Settings],
    queryFn: () => settingsApi.getCurrentSettings(),
  });

  const organizationQuery = useQuery({
    queryKey: [CacheKeyEnum.CurrentOrganization],
    queryFn: () => organizationsApi.getCurrentOrganization(),
  });

  const darkmode =
    data?.darkmode ?? Boolean(storage.getItem(DARKMODE_CACHE_KEY));

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
      storage.setItem(DARKMODE_CACHE_KEY, "true");
    } else {
      storage.removeItem(DARKMODE_CACHE_KEY);
    }
  }, [data]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return theme;
}
