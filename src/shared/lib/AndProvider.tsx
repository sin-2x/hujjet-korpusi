import React, { type PropsWithChildren } from "react";
import { ConfigProvider } from "antd";

export const AndProvider: React.FC<PropsWithChildren<unknown>> = ({
   children,
}) => {
   return (
      <ConfigProvider
         theme={{
            token: {
               colorPrimary: "#00b96b",
               borderRadius: 8,
            },
            components: {
               Button: {
                  //   colorPrimary: "#00b96b",
                  fontWeight: 600,
               },
            },
         }}
      >
         {children}
      </ConfigProvider>
   );
};
