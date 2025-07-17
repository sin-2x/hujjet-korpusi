import { UserControl } from "@/page";
import { authGuard } from "@/shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/userControl/")({
   component: UserControl,
   beforeLoad: authGuard,
});
