import type { RegisterValueType } from "@/shared";
import { create } from "zustand";

type User = Omit<RegisterValueType, "password">;

interface UserProfileStore {
   user: User | null;
   setUser: (user: User) => void;
}

export const useProfileStore = create<UserProfileStore>((set) => ({
   user: null,
   setUser: (user: User) => set({ user }),
}));
