import React, { useEffect } from "react";
import { useLocation } from "react-router";

import { Logger } from "src/logger";

const logger = new Logger(NavigationTrackingProvider.name);

export interface NavigationTrackingProviderProps {
  children: React.ReactNode;
}

export function NavigationTrackingProvider({
  children,
}: NavigationTrackingProviderProps): React.ReactElement {
  const location = useLocation();

  useEffect(() => {
    logger.info("Navigated to new page", {
      pathname: location.pathname,
      search: location.search,
    });
  }, [location]);

  return <>{children}</>;
}
