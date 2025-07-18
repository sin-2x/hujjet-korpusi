import { $api, AdminUserControl, type TCreateUserRes, type User, type Users } from "@/shared";

export type TUserUpdate = Partial<User> & { is_admin?: boolean };

export const userControlServices = {
   getAllUsers: async (page: number): Promise<Users> => {
      const res = await $api.get(AdminUserControl.GET_USERS, {
         params: { page },
      });
      return res.data;
   },
   searchUsers: async (args: string): Promise<Users> => {
      const res = await $api.get(AdminUserControl.SEARCH_USERS, {
         params: { args },
      });
      return res.data;
   },
   createUser: async (data: Omit<User, "id">): Promise<TCreateUserRes> => {
      const res = await $api.post(AdminUserControl.CREATE_NEW_USER, data);
      return res.data;
   },
   updateUser: async (
      id: string | number,
      body: TUserUpdate
   ): Promise<{ message: string }> => {
      const res = await $api.put(`${AdminUserControl.UPDATE_USER}${id}`, body);
      return res.data;
   },
   deleteUser: async (username: string) => {
      const res = await $api.delete(`${AdminUserControl.DELETE_USER}${username}/`);
      return res.data;
   },
};
