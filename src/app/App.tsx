import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import { routeTree } from "../routeTree.gen";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router;
   }
}

export const App: React.FC = () => {
   return <RouterProvider router={router} />;
};
