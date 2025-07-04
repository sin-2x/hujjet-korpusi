export type UserT = {
   name: string;
   surname: string;
   username: string;
   password: string;
};

export type LoginReturnType = {
   token: string;
   first_name: string;
   last_name: string;
};

export type LoginValueType = {
   username: string;
   password: string;
};
export type RegisterValueType = {
   username: string;
   first_name: string;
   last_name: string;
   password: string;
};

export type RegisterResType = Omit<
   Omit<LoginReturnType, "first_name">,
   "last_name"
>;
export enum RouteNames {
   Home = "/",
   Login = "/login",
   Register = "/register",
   Statistics = "/statistics",
   UserControl = "/userControl",
   FileManagement = "/fileManagement",
}

export type DownloadEndpoint = "download_admin_base" | "download_admin_txt";
