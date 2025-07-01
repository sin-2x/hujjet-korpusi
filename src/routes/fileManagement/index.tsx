import { authGuard } from "@/shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fileManagement/")({
   component: RouteComponent,
   // beforeLoad: authGuard,
});

function RouteComponent() {
   return <div>Hello "/fileManagement/"!</div>;
}
