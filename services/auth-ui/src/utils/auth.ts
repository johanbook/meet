import { captureException } from "@sentry/react";

import { attemptRefreshingSession } from "src/api/auth";

const REDIRECT_PATH_SEARCH_PARAM = "redirectToPath";

export const getValidatedRedirectPath = (redirectToPath: string) => {
  // To prevent open redirect vulnerabilities, validate the redirect path.
  // It must be a relative path starting with a single '/'.
  if (
    redirectToPath &&
    redirectToPath.startsWith("/") &&
    !redirectToPath.startsWith("//")
  ) {
    return redirectToPath;
  }

  return "/";
};

export const handleRedirect = () => {
  const searchParams = new URLSearchParams(window.location.search);

  window.location.href = getValidatedRedirectPath(
    searchParams.get(REDIRECT_PATH_SEARCH_PARAM) || "/",
  );
};

export const tryRefresh = async () => {
  try {
    const result = await attemptRefreshingSession();

    if (result) {
      handleRedirect();
    }
  } catch (error) {
    captureException(error);
  }
};
