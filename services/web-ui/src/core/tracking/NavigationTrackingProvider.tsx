import React, { useEffect } from "react";
import { useLocation } from "react-router";

import { Logger } from "src/core/logging";

const logger = new Logger(NavigationTrackingProvider.name);

export interface NavigationTrackingProviderProps {
  children: React.ReactNode;
}

export function NavigationTrackingProvider({
  children,
}: NavigationTrackingProviderProps): React.ReactElement {
  const location = useLocation();

  useEffect(() => {
    logger.debug(`Navigated to ${location.pathname}`, {
      pathname: location.pathname,
      search: location.search,
    });
  }, [location]);

  return <>{children}</>;
}
