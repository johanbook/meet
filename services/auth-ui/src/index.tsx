import React from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";

import { registerI18n } from "src/core/i18n";
import { ThemeProvider } from "src/core/theme";

import { App } from "./App";
import { reportWebVitals } from "./utils/reportWebVitals";

registerI18n();

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
