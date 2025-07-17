import { $api, type DeleteType } from "@/shared";

export const deleteService = async (
   id: string | React.Key,
   endpoint?: DeleteType
) => {
   const response = await $api.delete(`${endpoint}${id}/`);
   return response.data;
};
