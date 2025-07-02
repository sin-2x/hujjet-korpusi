import { $api, type File, type Files } from "@/shared";

export const fileServices = {
   getAllFiles: async (): Promise<Files<File>> => {
      const response = await $api.get("/admin/files/");
      return response.data;
   },
   verifyFiles: async (id: string) => {
      const response = await $api.post(`/admin/verify/${id}/true/`);
      return response.data;
   },
};
