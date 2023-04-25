import React from "react";

import SuperTokens from "supertokens-auth-react";

import { LoadingPage } from "./LoadingPage";
import { initializeSuperTokens } from "./supertokens";

export function Router(): React.ReactElement {
  if (!SuperTokens.canHandleRoute()) {
    return <p>An unexpected error has occurred</p>;
  }

  const component = SuperTokens.getRoutingComponent();

  if (!component) {
    return <p>An unexpected error has occurred</p>;
  }

  return component;
}

export default function App(): React.ReactElement {
  const [isInitialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    initializeSuperTokens(() => setInitialized(true));
  }, []);

  if (!isInitialized) {
    return <LoadingPage />;
  }

  return <Router />;
}
