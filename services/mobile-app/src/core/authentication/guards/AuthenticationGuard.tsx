import { ReactNode, useEffect } from "react";
import { Platform } from "react-native";
import { usePathname, useRouter } from "expo-router";

import { ResponseError } from "src/api";
import { profileApi } from "src/apis";
import { hasSession } from "src/core/authentication/session";
import { CacheKeyEnum, useQuery } from "src/core/query";
import { ErrorView } from "src/views/ErrorView";
import { LoadingView } from "src/views/LoadingView";

interface AuthenticationGuardProps {
  children: ReactNode;
}

function isAuthPage(pathname: string): boolean {
  return pathname === "/login" || pathname.startsWith("/verify-email");
}

export function AuthenticationGuard({ children }: AuthenticationGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  const onAuthPage = isAuthPage(pathname);

  // On native there is no browser cookie jar; an empty app session means the
  // user is definitely signed out, so the network probe is skipped and the
  // login screen is shown directly. On web the session lives in the browser,
  // which is invisible to JS - the probe is the only way to find out.
  const noSessionOnNative = Platform.OS !== "web" && !hasSession();

  const query = useQuery({
    queryKey: [CacheKeyEnum.CurrentProfileExists],
    queryFn: () => profileApi.checkIfProfileExists(),
    enabled: !noSessionOnNative,
    retry: false,
  });

  const error = query.error;
  const isLoading = query.isLoading;

  useEffect(() => {
    if (onAuthPage) {
      return;
    }

    if (noSessionOnNative) {
      router.replace(
        `/login?redirectTarget=${encodeURIComponent(pathname)}`,
      );

      return;
    }

    if (error instanceof ResponseError && error.response.status === 401) {
      router.replace(`/login?redirectTarget=${encodeURIComponent(pathname)}`);
    } else if (
      error instanceof ResponseError &&
      error.response.status === 403 &&
      error.response.errorMessage === "invalid claim"
    ) {
      router.replace(
        `/login?redirectTarget=${encodeURIComponent(pathname)}&verify=1`,
      );
    }
  }, [error, noSessionOnNative, onAuthPage, pathname, router]);

  if (onAuthPage) {
    return <>{children}</>;
  }

  if (noSessionOnNative) {
    // The redirect above is in flight; keep the screen stable until it lands.
    return <LoadingView />;
  }

  if (
    (error instanceof ResponseError && error.response.status === 401) ||
    (error instanceof ResponseError &&
      error.response.status === 403 &&
      error.response.errorMessage === "invalid claim")
  ) {
    // Redirect is handled above; keep the view stable until navigation lands.
    return <LoadingView />;
  }

  if (error) {
    return (
      <ErrorView
        description="We cannot verify your credentials right now. Try waiting a bit and refreshing the page."
        message="Unable to verify login"
      />
    );
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return <>{children}</>;
}