import { ReactElement } from "react";

import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";

export function Router(): ReactElement {
  if (canHandleRoute([EmailPasswordPreBuiltUI])) {
    return <p>An unexpected error has occurred: Unable to handle route</p>;
  }

  const component = getRoutingComponent([EmailPasswordPreBuiltUI]);

  if (!component) {
    return <p>An unexpected error has occurred: Component not found</p>;
  }

  return component;
}
