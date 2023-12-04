import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export interface ReactQueryTestProviderProps {
  children: React.ReactElement;
}

export function ReactQueryTestProvider({
  children,
}: ReactQueryTestProviderProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
