import { $api, type TCreateUserRes, type User, type Users } from "@/shared";

export type TUserUpdate = Partial<User> & { is_admin?: boolean };

export const userControlServices = {
   getAllUsers: async (page: number): Promise<Users> => {
      const res = await $api.get("/admin/users/", {
         params: { page },
      });
      return res.data;
   },
   searchUsers: async (args: string): Promise<Users> => {
      const res = await $api.get("/admin/search_user/", {
         params: { args },
      });
      return res.data;
   },
   createUser: async (data: Omit<User, "id">): Promise<TCreateUserRes> => {
      const res = await $api.post("/admin/create_user/", data);
      return res.data;
   },
   updateUser: async (
      id: string | number,
      body: TUserUpdate
   ): Promise<{ message: string }> => {
      const res = await $api.put(`/admin/change_user/${id}`, body);
      return res.data;
   },
   deleteUser: async (username: string) => {
      const res = await $api.delete(`/admin/delete_user/${username}/`);
      return res.data;
   },
};
