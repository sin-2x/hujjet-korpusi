import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "./statistics.services";

export const statisticsApi = {
  useStatisticsQuery: () => {
    return useQuery({
      queryKey: ["admin-statistics"],
      queryFn: statisticsService.getStatistics,
    });
  },
};
