import { AdminStatistics } from "@/shared";
import { $api } from "@/shared/api/base-api";

export const statisticsService = {
  async getStatistics() {
    const response = await $api.get(AdminStatistics.GET_STATISTICS);
    return response.data;
  },
};
