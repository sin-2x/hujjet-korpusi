import { AdminFileControl, type DownloadEndpoint, type File } from "@/shared";
import { App, Button, Tooltip } from "antd";
import React, { type PropsWithChildren } from "react";

interface IProps {
   downloadFile: any;
   element: File;
   endpoint: DownloadEndpoint;
   tooltip: string;
}
export const DownloadButton: React.FC<PropsWithChildren<IProps>> = ({
   downloadFile,
   element,
   endpoint,
   children,
   tooltip,
}) => {
   const { message } = App.useApp();
   return (
      <Tooltip title={tooltip}>
         <Button
            type="link"
            onClick={() => {
               downloadFile(
                  {
                     id: element.uuid,
                     endpoint,
                  },
                  {
                     onSuccess: (res: any) => {
                        const url = window.URL.createObjectURL(
                           new Blob([res.blob], {
                              type:
                                 endpoint ===
                                 AdminFileControl.DOWNLOAD_ORIGINAL_FILE
                                    ? res.blob.type
                                    : "text/plain",
                           })
                        );
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", "file");
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        message.success("File downloaded successfully");
                     },
                     onError: () => {
                        message.error("Error downloading file");
                     },
                  }
               );
            }}
         >
            {children}
         </Button>
      </Tooltip>
   );
};
