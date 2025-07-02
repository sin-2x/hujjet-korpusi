import { FileManagement } from "@/page";
import { authGuard } from "@/shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fileManagement/")({
   component: FileManagement,
   beforeLoad: authGuard,
});
