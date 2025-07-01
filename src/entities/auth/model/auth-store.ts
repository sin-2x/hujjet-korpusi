import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
   isAuth: boolean;
   token: string | null;
   setIsAuth: (isAuth: boolean) => void;
   setToken: (token: string | null) => void;
   signOut: () => void;
}
export const useAuthStore = create(
   persist<AuthState>(
      (set) => ({
         isAuth: false,
         token: null,
         setIsAuth: (isAuth: boolean) => set({ isAuth }),
         setToken: (token: string | null) => set({ token }),
         signOut: () => set({ isAuth: false, token: null }),
      }),
      {
         name: "auth",
      }
   )
);
