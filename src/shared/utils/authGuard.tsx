import { redirect } from "@tanstack/react-router";

export function authGuard() {
   const token = localStorage.getItem("auth");
   if (!token) {
      throw redirect({ to: "/login" });
   }
}
