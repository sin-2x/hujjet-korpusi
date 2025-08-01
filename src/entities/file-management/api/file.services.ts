import {
   $api,
   AdminFileControl,
   getFilenameFromHeaders,
   type DownloadEndpoint,
   type Files,
   type JsonViewData,
   type TStartTaskResponse,
   type TTaskStatusResponse,
} from "@/shared";
import type React from "react";

export const fileServices = {
   getAllFiles: async (page: number): Promise<Files> => {
      const response = await $api.get(AdminFileControl.GET_FILES, {
         params: { page },
      });
      return response.data;
   },
   verifyFiles: async (id: string | React.Key, endpoint: "true" | "false") => {
      const response = await $api.post(
         `${AdminFileControl.VERIFY_FILE}${id}/${endpoint}/`
      );
      return response.data;
   },
   downloadFile: async (id: string | React.Key, endpoint: DownloadEndpoint) => {
      const response = await $api.get(`${endpoint}${id}/`, {
         responseType: "blob",
      });
      return {
         blob: response.data,
         filename: getFilenameFromHeaders(response.headers),
      };
   },
   deleteFile: async (id: string | React.Key) => {
      const response = await $api.delete(
         `${AdminFileControl.DELETE_FILE}${id}/`
      );
      return response.data;
   },
   getSearchFiles: async (args: string): Promise<Files> => {
      const response = await $api.get(AdminFileControl.GET_SEARCH_FILES, {
         params: { args },
      });
      return response.data;
   },
   // downloadMergedTxt: async () => {
   //    const response = await $api.get(AdminFileControl.DOWNLOAD_MERGED_TXT, {
   //       responseType: "blob",
   //    });
   //    return {
   //       blob: response.data,
   //       filename: getFilenameFromHeaders(response.headers),
   //    };
   // },
   downloadJsonFile: async (id: string): Promise<JsonViewData> => {
      const response = await $api.get(
         `${AdminFileControl.DOWNLOAD_JSON_TXT_FILE}${id}/`
      );
      return response.data;
   },
   startMerge: async (): Promise<TStartTaskResponse> => {
      const response = await $api.post(AdminFileControl.START_MERGE);
      return response.data;
   },
   getTaskStatus: async (task_id: string): Promise<TTaskStatusResponse> => {
      const response = await $api.get(
         `${AdminFileControl.TASK_STATUS}${task_id}`
      );
      console.log(response.data);
      return response.data;
   },
   downloadMergedFile: async (task_id: string) => {
      const response = await $api.get(AdminFileControl.DOWNLOAD_MERGED_FILE, {
         responseType: "blob",
         params: { task_id },
      });
      return {
         blob: response.data,
         filename: getFilenameFromHeaders(response.headers),
      };
   },
};
