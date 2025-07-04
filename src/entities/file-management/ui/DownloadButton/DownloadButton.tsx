import type { DownloadEndpoint, File } from "@/shared";
import { Button, Tooltip } from "antd";
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
                        console.log(res);
                        const url = window.URL.createObjectURL(
                           new Blob([res.blob], {
                              type:
                                 endpoint === "download_admin_base"
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
                     },
                     onError: () => {},
                  }
               );
            }}
         >
            {children}
         </Button>
      </Tooltip>
   );
};
