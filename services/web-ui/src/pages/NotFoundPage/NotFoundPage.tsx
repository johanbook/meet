import { ReactElement } from "react";

import { ErrorView } from "src/views/ErrorView";

import { NotFoundNav } from "./NotFoundPage.nav";

export function NotFoundPage(): ReactElement {
  return (
    <NotFoundNav>
      <ErrorView
        description="The page you were looking for was not found"
        message="Page not found"
      />
    </NotFoundNav>
  );
}
