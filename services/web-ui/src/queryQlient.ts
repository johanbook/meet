import { QueryClient } from "@tanstack/react-query";

import { Logger } from "src/core/logging";

const logger = new Logger(QueryClient.name);

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (err) => {
        const error = err as Error;
        logger.error("Failed to execute mutation", {
          error: {
            message: error.message,
            stackTrace: error.stack,
          },
        });
      },
    },
    queries: {
      // Limit retries
      retry: 1,
      // Consider data to be fresh for 20 seconds
      staleTime: 20 * 1000,
    },
  },
});
