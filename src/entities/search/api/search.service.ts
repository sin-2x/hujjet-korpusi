import { $api } from "@/shared";

export const searchService = async <T>(args: string, endpoint:string): Promise<T> => {
   const response = await $api.get(endpoint, {
      params: { args },
   });
   return response.data;
};
