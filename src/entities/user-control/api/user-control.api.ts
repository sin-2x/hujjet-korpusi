import { useMutation, useQuery } from "@tanstack/react-query";
import { userControlServices, type TUserUpdate } from "./user-control.services";

export const userControlApi = {
   useCreateUser: () => {
      return useMutation({
         mutationFn: () => userControlServices.createUser(),
      });
   },
   useGetAllUsers: (page: number) => {
      return useQuery({
         queryFn: () => userControlServices.getAllUsers(page),
         queryKey: ["users", page],
      });
   },
   useSearchUsers: (args: string) => {
      return useQuery({
         queryFn: () => userControlServices.searchUsers(args),
         queryKey: ["search-users", args],
      });
   },
   useDeleteUser: () => {
      return useMutation({
         mutationFn: (username: string) =>
            userControlServices.deleteUser(username),
      });
   },
   useUpdateUser: () => {
      return useMutation({
         mutationFn: (body: TUserUpdate) =>
            userControlServices.updateUser(body),
      });
   },
};
