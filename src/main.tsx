import { createRoot } from "react-dom/client";
import "./index.css";
import { AndProvider } from "./shared/lib";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./shared";
import { App } from "./app/App";
import { App as AntdApp } from "antd";
//c

createRoot(document.getElementById("root")!).render(
   <AndProvider>
      <AntdApp>
         <QueryClientProvider client={client}>
            <App />
         </QueryClientProvider>
      </AntdApp>
   </AndProvider>
);
