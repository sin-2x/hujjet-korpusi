import { create } from "zustand";

interface SearchState {
   searchValue: string;
   setSearch: (search: string) => void;
}

export const searchStore = create<SearchState>((set) => ({
   searchValue: "",
   setSearch: (search) => set({ searchValue: search }),
}));
