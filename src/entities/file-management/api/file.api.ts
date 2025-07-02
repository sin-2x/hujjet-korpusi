import { useMutation, useQuery } from "@tanstack/react-query";
import { fileServices } from "./file.services";
import type { MessageInstance } from "antd/es/message/interface";

export const fileApi = {
   useGetAllFilesQuery: () => {
      return useQuery({
         queryKey: ["files"],
         queryFn: fileServices.getAllFiles,
      });
   },
   useVerifyFilesMutation: () => {
      return useMutation({
         mutationFn: fileServices.verifyFiles,
         onSuccess: (messageApi: MessageInstance) => {
            messageApi.success("Файлы успешно проверены");
         },
         onError: (messageApi: MessageInstance) => {
            messageApi.error("Произошла ошибка при проверке файлов");
         },
      });
   },
};
