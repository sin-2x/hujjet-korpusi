import { $api } from "@/shared/api/base-api";

export const statisticsService = {
  async getStatistics() {
    const response = await $api.get("/admin/statistika/");
    return response.data;
  },
};
