import { authGuard } from "@/shared";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
   component: RouteComponent,
   beforeLoad: authGuard,
});

function RouteComponent() {
   return (
      <div className="text-3xl text-center ">
         <h1>Hujjet Korpusi admin panel</h1>
         <h2>Welcome </h2>
      </div>
   );
}
