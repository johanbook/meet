import PALETTES from "./palette";
import { ThemeEnum } from "./theme.enum";

// Defaults matching the MUI palette the web app builds on top of.
const MUI_DEFAULTS = {
  info: "#0288d1",
  secondary: "#9c27b0",
  warning: "#ff9800",
} as const;

export interface ThemePalette {
  background: {
    main: string;
    paper: string;
  };
  divider: string;
  error: string;
  info: string;
  primary: string;
  secondary: string;
  success: string;
  text: {
    primary: string;
    secondary: string;
  };
  warning: string;
}

export interface Theme {
  darkmode: boolean;
  palette: ThemePalette;
  spacing: (factor: number) => number;
}

interface CreateThemeProps {
  darkmode: boolean;
  theme: ThemeEnum;
}

const LIGHT: Pick<ThemePalette, "background" | "divider" | "text"> = {
  background: {
    main: "#ffffff",
    paper: "#ffffff",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
  },
};

const DARK: Pick<ThemePalette, "background" | "divider" | "text"> = {
  background: {
    main: "#121212",
    paper: "#1e1e1e",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  text: {
    primary: "rgba(255, 255, 255, 0.87)",
    secondary: "rgba(255, 255, 255, 0.6)",
  },
};

export function createTheme({ darkmode, theme }: CreateThemeProps): Theme {
  const palette = PALETTES[theme] || PALETTES.default;
  const base = darkmode ? DARK : LIGHT;

  return {
    darkmode,
    palette: {
      ...MUI_DEFAULTS,
      ...base,
      error: palette.error,
      primary: palette.primary,
      success: palette.success,
    },
    spacing: (factor: number) => 8 * factor,
  };
}