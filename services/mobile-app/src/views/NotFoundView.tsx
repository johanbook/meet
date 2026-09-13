import { ErrorView } from "./ErrorView";

export function NotFoundView() {
  return (
    <ErrorView
      description="The page you were looking for was not found"
      message="Page not found"
    />
  );
}
