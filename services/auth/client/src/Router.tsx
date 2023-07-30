import React from "react";

import SuperTokens from "supertokens-auth-react";

export function Router(): React.ReactElement {
  if (!SuperTokens.canHandleRoute()) {
    return <p>An unexpected error has occurred: Unable to handle route</p>;
  }

  const component = SuperTokens.getRoutingComponent();

  if (!component) {
    return <p>An unexpected error has occurred: Component not found</p>;
  }

  return component;
}
