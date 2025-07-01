import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

interface LocationItem {
  pathname: string;
}

const NavigationHistoryContext = createContext<LocationItem[]>([]);

export interface NavigationHistoryProviderProps {
  children: React.ReactNode;
}

export function NavigationHistoryProvider({
  children,
}: NavigationHistoryProviderProps): React.ReactElement {
  const currentLocation = useLocation();

  const [navigationHistory, setNavigationHistory] = useState<LocationItem[]>(
    [],
  );

  useEffect(() => {
    setNavigationHistory((navigationHistory) => [
      ...navigationHistory,
      {
        pathname: currentLocation.pathname,
      },
    ]);
  }, [currentLocation.pathname]);

  return (
    <NavigationHistoryContext.Provider value={navigationHistory}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}
