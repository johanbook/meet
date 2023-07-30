import React from "react";

import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "./theme";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const theme = createTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
