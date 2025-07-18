import { Home } from "@/page";
import { authGuard } from "@/shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
   component: Home,
   beforeLoad: authGuard,
});
