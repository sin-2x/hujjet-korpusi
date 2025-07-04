import { useQueryClient, type UseMutateFunction } from "@tanstack/react-query";
import { Button } from "antd";
import React, { type PropsWithChildren } from "react";

interface IProps {
   selectedRowKeys: React.Key[];
   setSelectedRowKeys: (selectedRowKeys: React.Key[]) => void;
   verifyFiles: UseMutateFunction<
      unknown,
      Error,
      {
         id: string[] | React.Key[];
         endpoint: "true" | "false";
      },
      unknown
   >;
   endpoint: "true" | "false";
}

export const VerifyButton: React.FC<PropsWithChildren<IProps>> = ({
   children,
   verifyFiles,
   setSelectedRowKeys,
   selectedRowKeys,
   endpoint,
}) => {
   const queryClient = useQueryClient();
   return (
      <Button
         type="primary"
         style={{
            padding: "20px",
         }}
         onClick={async () => {
            await verifyFiles(
               { id: selectedRowKeys, endpoint },
               {
                  onSuccess: () => {
                     setSelectedRowKeys([]);
                     queryClient.invalidateQueries({ queryKey: ["files"] });
                  },
               }
            );
         }}
      >
         {children}
      </Button>
   );
};
