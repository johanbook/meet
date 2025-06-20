import { ReactElement } from "react";

import { ErrorView } from "src/views/ErrorView";

import { NotFoundNav } from "./NotFoundView.nav";

export function NotFoundView(): ReactElement {
  return (
    <NotFoundNav>
      <ErrorView
        description="The page you were looking for was not found"
        message="Page not found"
      />
    </NotFoundNav>
  );
}
