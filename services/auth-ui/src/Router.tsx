import { ReactElement } from "react";

import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";

import { ErrorView } from "src/views/ErrorView";

const SUPERTOKEN_ROUTERS = [
  EmailPasswordPreBuiltUI,
  EmailVerificationPreBuiltUI,
];

export function Router(): ReactElement {
  if (!canHandleRoute(SUPERTOKEN_ROUTERS)) {
    return (
      <ErrorView message="An unexpected error has occurred: Unable to handle route. Please contact support." />
    );
  }

  const component = getRoutingComponent(SUPERTOKEN_ROUTERS);

  if (!component) {
    return (
      <ErrorView message="An unexpected error has occurred: Component not found. Please contact support." />
    );
  }

  return component;
}
