import { FC } from "react";

import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import Router from "./Router";
import Theme from "./theme/Theme";

const App: FC = () => {
  return (
    <Theme>
      <CssBaseline />
      <Router />
    </Theme>
  );
};

export default App;
