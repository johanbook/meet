import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export interface ReactQueryTestProviderProps {
  children: React.ReactElement;
}

export default function ReactQueryTestProvider({
  children,
}: ReactQueryTestProviderProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
