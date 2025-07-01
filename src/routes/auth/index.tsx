import { Register } from "@/entities";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
   component: Register,

});
