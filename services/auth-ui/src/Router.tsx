import { ReactElement } from "react";

import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";

import { ErrorView } from "src/views/ErrorView";

export function Router(): ReactElement {
  if (!canHandleRoute([EmailPasswordPreBuiltUI])) {
    return (
      <ErrorView message="An unexpected error has occurred: Unable to handle route. Please contact support." />
    );
  }

  const component = getRoutingComponent([EmailPasswordPreBuiltUI]);

  if (!component) {
    return (
      <ErrorView message="An unexpected error has occurred: Component not found. Please contact support." />
    );
  }

  return component;
}
