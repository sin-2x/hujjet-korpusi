import { Flex, Typography } from "antd";
import React, { type PropsWithChildren } from "react";

export const TitlePage: React.FC<PropsWithChildren<{title:string}>> = ({title,children}) => {
   return (
      <Flex gap="middle" vertical>
         <Typography.Title level={3}>{title}</Typography.Title>
         <Flex gap="middle">{children}</Flex>
      </Flex>
   );
};
