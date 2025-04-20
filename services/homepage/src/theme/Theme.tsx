import { FC, ReactNode } from "react";

import PALETTE from "./palette";

import { createTheme as createMuiTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

function createTheme() {
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

interface ThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper: FC<ThemeWrapperProps> = ({ children }) => {
  const theme = createTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
