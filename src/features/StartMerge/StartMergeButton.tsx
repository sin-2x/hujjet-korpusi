import { BsCollectionFill } from "react-icons/bs";
import { App, Button } from "antd";
import React from "react";
import { fileApi } from "@/entities";
import { FileStatus } from "@/shared";

export const StartMergeButton: React.FC = () => {
   const startMerge = React.useRef<boolean>(false);
   const { message } = App.useApp();
   const { mutate: startMergeFn, data } = fileApi.useStartMergeMutation();
   const {
      mutate: getTaskStatusFn,
      data: statusData,
      isPending,
   } = fileApi.useGetTaskStatusMutation();
   const { mutate: downloadMergedFileFn } =
      fileApi.useDownloadMergedFileMutation();

   const handleStartMerge = () => {
      startMerge.current = true;
      startMergeFn();
   };

   const handleDownload = () => {
      if (statusData?.task_id) {
         downloadMergedFileFn(statusData.task_id);
      }
   };
   React.useEffect(() => {
      if (!data?.task_id) return;

      const interval = setInterval(() => {
         getTaskStatusFn(data.task_id, {
            onSuccess: (res) => {
               if (
                  res.state === FileStatus.SUCCESS ||
                  res.state === FileStatus.REJECTED
               ) {
                  clearInterval(interval);
                  startMerge.current = false;
               }
               message.success(res.state);
            },
            onError: () => {
               clearInterval(interval);
               startMerge.current = false;
               message.error("Error getting task status");
            },
         });
      }, 1000);

      return () => clearInterval(interval);
   }, [data?.task_id, getTaskStatusFn, message]);

   return (
      <>
         {statusData?.state === FileStatus.SUCCESS && !startMerge.current && (
            <Button
               size="large"
               type="primary"
               icon={<BsCollectionFill />}
               onClick={handleDownload}
            >
               Download Merged File
            </Button>
         )}
         <Button
            size="large"
            type="primary"
            icon={<BsCollectionFill />}
            onClick={handleStartMerge}
            loading={isPending}
         >
            Start Merge
         </Button>
      </>
   );
};
