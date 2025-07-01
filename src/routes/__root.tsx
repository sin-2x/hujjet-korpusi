import { Home } from "@/page";
import { createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
   component: () => <Home />,
   notFoundComponent: () => <h1>404</h1>,
});
