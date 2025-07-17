import { FaUserEdit } from "react-icons/fa";
import { Button, Tooltip } from "antd";
import React from "react";

export const UpdateUserBtn: React.FC = () => {
   return (
      <Tooltip title="Update user">
         <Button type="primary">
            <FaUserEdit />
         </Button>
      </Tooltip>
   );
};
