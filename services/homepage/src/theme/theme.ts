import { createTheme as createMuiTheme } from "@mui/material/styles";

import PALETTE from "./palette";

export function createTheme() {
  return createMuiTheme({
    palette: {
      error: {
        main: PALETTE.error,
      },
      primary: {
        main: PALETTE.primary,
      },
      success: {
        main: PALETTE.success,
      },
    },
  });
}
