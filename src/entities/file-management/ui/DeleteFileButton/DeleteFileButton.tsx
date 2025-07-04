import type { File } from "@/shared";
import { useQueryClient, type UseMutateFunction } from "@tanstack/react-query";
import { Button, Popconfirm, type PopconfirmProps } from "antd";
import React, { type PropsWithChildren } from "react";
import { FaTrash } from "react-icons/fa";

interface IProps {
   element: File;
   deleteFile: UseMutateFunction<unknown, Error, React.Key, unknown>;
}

export const DeleteFileButton: React.FC<PropsWithChildren<IProps>> = ({
   element,
   deleteFile,
}) => {
   const queryClient = useQueryClient();
   const confirm: PopconfirmProps["onConfirm"] = () => {
      deleteFile(element.uuid, {
         onSuccess: () => {
            queryClient.invalidateQueries({
               queryKey: ["files"],
            });
         },
      });
   };

   const cancel: PopconfirmProps["onCancel"] = () => {};
   return (
      <Popconfirm
         title="Delete the file"
         description="Are you sure to delete this file?"
         onConfirm={confirm}
         onCancel={cancel}
         okText="Yes"
         cancelText="No"
      >
         <Button type="text" danger>
            <FaTrash />
         </Button>
      </Popconfirm>
   );
};
