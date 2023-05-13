import React from "react";

import { Router } from "./Router";
import { LoadingPage } from "./pages/LoadingPage";
import { initializeSuperTokens } from "./supertokens";

export function App(): React.ReactElement {
  const [isInitialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    initializeSuperTokens(() => setInitialized(true));
  }, []);

  if (!isInitialized) {
    return <LoadingPage />;
  }

  return <Router />;
}
