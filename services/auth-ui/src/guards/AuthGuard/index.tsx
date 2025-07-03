import { FC, ReactNode, useEffect, useState } from "react";

import { captureException } from "@sentry/react";

import { tryRefresh } from "src/utils/auth";
import { LoadingView } from "src/views/LoadingView";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleTryRefresh = async () => {
      try {
        await tryRefresh();
      } catch (error) {
        captureException(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleTryRefresh();
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  return <>{children} </>;
};
