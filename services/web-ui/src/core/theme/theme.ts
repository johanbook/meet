import { createTheme as createMuiTheme } from "@mui/material/styles";

import PALETTE from "./palette";
import { ThemeEnum } from "./theme.enum";

interface CreateThemeProps {
  darkmode: boolean;
  theme: ThemeEnum;
}

export function createTheme({ darkmode, theme }: CreateThemeProps) {
  const palette = PALETTE[theme] || PALETTE.default;

  return createMuiTheme({
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            "&:before": {
              display: "none",
            },
          },
          rounded: ({ theme }) => ({
            borderRadius: theme.spacing(2),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.spacing(2),
          }),
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: theme.spacing(2),
            // Dialogs smaller than this will not look good
            minWidth: theme.spacing(40),
          }),
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: ({ theme }) => ({
            justifyContent: "space-between",
            padding: theme.spacing(2),
          }),
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.spacing(1),
          }),
        },
      },
    },
    palette: {
      error: {
        main: palette.error,
      },
      mode: darkmode ? "dark" : "light",
      primary: {
        main: palette.primary,
      },
      success: {
        main: palette.success,
      },
    },
  });
}
