import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userControlServices, type TUserUpdate } from "./user-control.services";
import type { User } from "@/shared";

export const userControlApi = {
   useCreateUser: () => {
      const queryClient = useQueryClient();
      return useMutation({
         mutationFn: (data: Omit<User, "id">) =>
            userControlServices.createUser(data),
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
         },
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
         enabled: !!args.length,
      });
   },
   useDeleteUser: () => {
      return useMutation({
         mutationFn: (username: string) =>
            userControlServices.deleteUser(username),
      });
   },
   useUpdateUser: () => {
      const queryClient = useQueryClient()
      return useMutation({
         mutationFn: ({ id, body }: { body: TUserUpdate; id: string|number }) =>
            userControlServices.updateUser(id, body),
         onSuccess: ( ) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
         }
      });
   },
};
