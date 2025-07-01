import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { AndProvider } from "./shared/lib";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./shared";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router;
   }
}

createRoot(document.getElementById("root")!).render(
   <AndProvider>
      <QueryClientProvider client={client}>
         <RouterProvider router={router} />
      </QueryClientProvider>
   </AndProvider>
);
