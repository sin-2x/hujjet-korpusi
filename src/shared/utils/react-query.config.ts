import { QueryClient } from "@tanstack/react-query";

export const client = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 1,
         retryDelay: 1000,
      },
   },
});
