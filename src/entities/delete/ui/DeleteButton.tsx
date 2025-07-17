import { type UseMutateFunction } from "@tanstack/react-query";
import { App, Button, Popconfirm, Tooltip, type PopconfirmProps } from "antd";
import React, { type PropsWithChildren } from "react";
import { FaTrash } from "react-icons/fa";

interface IProps {
   uuid: string;
   deleteFn: UseMutateFunction<unknown, Error, React.Key, unknown>;
   title: string;
   description: string;
}

export const DeleteButton: React.FC<PropsWithChildren<IProps>> = ({
   uuid,
   deleteFn,
   description,
   title,
}) => {
   const { message } = App.useApp();
   const confirm: PopconfirmProps["onConfirm"] = () => {
      deleteFn(uuid, {
         onSuccess: () => {
            message.success("Deleted successfully");
         },
         onError: () => {
            message.error("Not deleted");
         },
      });
   };

   const cancel: PopconfirmProps["onCancel"] = () => {};
   return (
      <Popconfirm
         title={title}
         description={description}
         onConfirm={confirm}
         onCancel={cancel}
         okText="Yes"
         cancelText="No"
      >
         <Tooltip title="Delete">
            <Button type="text" danger>
               <FaTrash />
            </Button>
         </Tooltip>
      </Popconfirm>
   );
};
