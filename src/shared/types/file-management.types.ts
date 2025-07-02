export type Files<T> = {
   count: number;
   next: string;
   previous: string;
   results: T[];
};

export type File = {
   uuid: string;
   content: string;
   created_at: string;
   download_url: string | null;
   file_path: string;
   file_size: number;
   file_type: string;
   status: string;
   title: string;
   verified: boolean;
};
