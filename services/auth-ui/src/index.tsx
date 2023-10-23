import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { registerI18n } from "./core/i18n";
import { reportWebVitals } from "./utils/reportWebVitals";

registerI18n();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root") as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
