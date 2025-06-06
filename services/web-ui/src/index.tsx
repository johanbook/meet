import React from "react";
import ReactDOM from "react-dom/client";

import * as Sentry from "@sentry/react";

import { registerI18n } from "src/core/i18n";
import { registerExceptionLogger } from "src/core/logging/logger";
import { registerWebVitalsReporter } from "src/core/web-vitals";

import { App } from "./App";
import { config } from "./config";
import { registerServiceWorker } from "./registerServiceWorker";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: false,
});

registerI18n();
registerExceptionLogger();

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (config.MONITORING.REPORT_WEB_VITALS) {
  registerWebVitalsReporter(console.log);
}

if ("serviceWorker" in navigator) {
  registerServiceWorker();
}
