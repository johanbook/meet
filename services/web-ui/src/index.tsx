import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { config } from "./config";
import reportWebVitals from "./utils/reportWebVitals";

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
  reportWebVitals(console.log);
}
