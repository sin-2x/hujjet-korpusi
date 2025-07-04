import {
   $api,
   getFilenameFromHeaders,
   type DownloadEndpoint,
   type File,
   type Files,
} from "@/shared";
import type React from "react";

export const fileServices = {
   getAllFiles: async (page: number): Promise<Files<File>> => {
      const response = await $api.get("/admin/files/", {
         params: { page },
      });
      return response.data;
   },
   verifyFiles: async (id: string | React.Key, endpoint: "true" | "false") => {
      const response = await $api.post(`/admin/verify/${id}/${endpoint}/`);
      return response.data;
   },
   downloadFile: async (id: string | React.Key, endpoint: DownloadEndpoint) => {
      const response = await $api.get(`/admin/${endpoint}/${id}/`, {
         responseType: "blob",
      });
      return {
         blob: response.data,
         filename: getFilenameFromHeaders(response.headers),
      };
   },
   deleteFile: async (id: string | React.Key) => {
      const response = await $api.delete(`/admin/delete_file/${id}/`);
      return response.data;
   },
   getSearchFiles: async (args: string): Promise<Files<File>> => {
      const response = await $api.get("/admin/search_file/", {
         params: { args },
      });
      return response.data;
   },
};
