import type { Files } from "./file-management.types";

export type User = {
   id: number;
   username: string;
   first_name: string;
   last_name: string;
   password: string;
};
export type Users = Files<User>;

export type TCreateUserRes = {
   detail: string;
   username: string;
   token: string;
};
