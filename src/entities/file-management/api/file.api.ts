import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fileServices } from "./file.services";
import type React from "react";
import type { DownloadEndpoint } from "@/shared";

export const fileApi = {
   useGetAllFilesQuery: (page: number) => {
      return useQuery({
         queryKey: ["files", page],
         queryFn: () => fileServices.getAllFiles(page),
      });
   },
   useVerifyFilesMutation: () => {
      const queryClient = useQueryClient();

      return useMutation({
         mutationFn: async (variables: {
            id: string[] | React.Key[];
            endpoint: "true" | "false";
         }) => {
            for (const id of variables.id) {
               await fileServices.verifyFiles(id, variables.endpoint);
            }
         },
         onSuccess: () => {
            queryClient.invalidateQueries({
               queryKey: ["files"],
               exact: false,
            });
         },
         onError: () => {},
      });
   },
   useDownloadFileMutation: () => {
      return useMutation({
         mutationFn: (variables: {
            id: string | React.Key;
            endpoint: DownloadEndpoint;
         }) => fileServices.downloadFile(variables.id, variables.endpoint),
      });
   },
   useDeleteFileMutation: () => {
      const queryClient = useQueryClient();
      return useMutation({
         mutationFn: (id: string | React.Key) => fileServices.deleteFile(id),
         onSuccess: () => {
            queryClient.invalidateQueries({
               queryKey: ["files"],
               exact: false,
            });
         },
      });
   },
   useGetSearchFilesQuery: (args: string) => {
      return useQuery({
         queryKey: ["search-files", args],
         queryFn: () => fileServices.getSearchFiles(args),
         enabled: !!args.length,
      });
   },
   useDownloadJsonFileQuery: () => {
      return useMutation({
         mutationFn: (id: string) => fileServices.downloadJsonFile(id),
      });
   },
   useDownloadMergedFileMutation: () => {
      return useMutation({
         mutationFn: (task_id: string) =>
            fileServices.downloadMergedFile(task_id),
         onSuccess: ({ blob, filename }) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename || "merged.txt";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
         },
      });
   },
   useGetTaskStatusMutation: () => {
      return useMutation({
         mutationFn: (task_id: string) => fileServices.getTaskStatus(task_id),
      });
   },
   useStartMergeMutation: () => {
      return useMutation({
         mutationFn: () => fileServices.startMerge(),
      });
   },
};
