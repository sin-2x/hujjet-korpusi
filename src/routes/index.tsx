import { useAuthStore } from "@/entities";
import { Home } from "@/page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
   component: Home,
   beforeLoad: () => {
      if (!useAuthStore.getState().isAuth) {
         throw redirect({ to: "/login" });
      }
   },
});
