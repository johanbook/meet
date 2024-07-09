import React from "react";
import ReactDOM from "react-dom/client";

import { registerI18n } from "src/core/i18n";
import { registerExceptionLogger } from "src/core/logging/logger";
import { registerWebVitalsReporter } from "src/core/web-vitals";

import { App } from "./App";
import { config } from "./config";

registerI18n();
registerExceptionLogger();

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (config.MONITORING.REPORT_WEB_VITALS) {
  /* eslint-disable-next-line no-console */
  registerWebVitalsReporter(console.log);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
