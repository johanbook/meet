import { createTheme as createMuiTheme } from "@mui/material/styles";

import PALETTE from "./palette";

export function createTheme(darkmode = false) {
  return createMuiTheme({
    components: {
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
        main: PALETTE.error,
      },
      mode: darkmode ? "dark" : "light",
      primary: {
        main: PALETTE.primary,
      },
      success: {
        main: PALETTE.success,
      },
    },
  });
}
