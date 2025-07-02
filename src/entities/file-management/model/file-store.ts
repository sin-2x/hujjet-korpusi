import { create } from "zustand";

interface FileState {
   files: File[];
   setFiles: (files: File[]) => void;
}

export const useFileStore = create<FileState>((set) => ({
   files: [],
   setFiles: (files) => set({ files }),
}));
