import type { JsonViewData } from "@/shared";
import type { UseMutateFunction } from "@tanstack/react-query";
import { Button, Modal, Tooltip } from "antd";
import React from "react";
import { BsFiletypeJson } from "react-icons/bs";

interface IProps {
   downloadJsonFn: UseMutateFunction<any, Error, string, unknown>;
   uuid: string;
   data: JsonViewData;
   isLoading: boolean;
}

export const JsonViewButton: React.FC<IProps> = React.memo(
   ({ downloadJsonFn, uuid, data, isLoading }) => {
      const [isModalOpen, setIsModalOpen] = React.useState(false);

      const showModal = () => {
         setIsModalOpen(true);
      };

      return (
         <>
            <Tooltip title="view">
               <Button
                  onClick={() => {
                     downloadJsonFn(uuid);
                     showModal();
                  }}
                  type="link"
               >
                  <BsFiletypeJson />
               </Button>
            </Tooltip>
            <Modal
               title="Basic Modal"
               closable={{ "aria-label": "Custom Close Button" }}
               onCancel={() => setIsModalOpen(false)}
               open={isModalOpen}
               footer={null}
               loading={isLoading}
            >
               <span>{data?.text || "no information available"}</span>
            </Modal>
         </>
      );
   }
);
