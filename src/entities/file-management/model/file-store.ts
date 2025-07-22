import { FileStatus } from "@/shared";
import { create } from "zustand";

interface FileState {
   task_id: string;
   status: FileStatus;
   setTaskId: (taskId: string) => void;
   setStatus: (status: FileStatus) => void;
}

export const useFileStore = create<FileState>((set) => ({
   task_id: "",
   status: FileStatus.PENDING,
   setTaskId: (taskId: string) => set({ task_id: taskId }),
   setStatus: (status: FileStatus) => set({ status }),
}));
