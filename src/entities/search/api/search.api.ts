import { useQuery } from "@tanstack/react-query";
import { searchService } from "./search.service";

export const useGetSearchApiQuery = <T>(args: string, endpoint: string) => {
   return useQuery({
      queryKey: ["search-files"],
      queryFn: () => searchService<T>(args, endpoint),
      enabled: !!args.length,
   });
};
