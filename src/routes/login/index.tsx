import { Login } from "@/entities";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
   component: Login,
});
