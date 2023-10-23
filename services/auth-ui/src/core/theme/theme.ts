import { createTheme as createMuiTheme } from "@mui/material/styles";

import PALETTE from "./palette";

export function createTheme(darkmode = false) {
  return createMuiTheme({
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
