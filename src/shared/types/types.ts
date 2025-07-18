import type { AdminFileControl } from "../utils";

export type TReponse<T> = {
   count: number;
   next: string;
   previous: string;
   results: T[];
};

// Login
export type LoginReturnType = {
   token: string;
   first_name: string;
   last_name: string;
};

export type LoginValueType = {
   username: string;
   password: string;
};

export enum RouteNames {
   Home = "/",
   Login = "/login",
   Register = "/register",
   Statistics = "/statistics",
   UserControl = "/userControl",
   FileManagement = "/fileManagement",
}

export type DownloadEndpoint =
   | AdminFileControl.DOWNLOAD_ORIGINAL_FILE
   | AdminFileControl.DOWNLOAD_TXT_FILE;

//  User
export type User = {
   id: number;
   username: string;
   first_name: string;
   last_name: string;
};
export type TCreateUserRes = {
   detail: string;
   username: string;
   token: string;
};
export type Users = TReponse<User>;

// File
export type File = {
   uuid: string;
   title: string;
   file_type: string;
   file_size: number;
   status: string;
   created_at: string;
   file_path: string;
   description: string;
   download_url: null;
   is_verified: boolean;
   token_count: number;
   vocab_count: number;
   sentence_count: number;
};
export type Files = TReponse<File>;

// Json view data response
export type JsonViewData = {
   uuid: string;
   text: string;
};
