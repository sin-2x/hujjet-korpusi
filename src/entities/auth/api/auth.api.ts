import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authServices } from "./auth.services";
import type { MessageInstance } from "antd/es/message/interface";

export const authApi = {
   useLoginMutation: (messageApi: MessageInstance) => {
      const queryClient = useQueryClient();
      const mutation = useMutation({
         mutationFn: authServices.login,
         onSuccess: () => {
            messageApi.success("Вы успешно вошли в систему");
            queryClient.invalidateQueries({ queryKey: ["me"] });
         },
         onError: () => {
            messageApi.error("Неправильный логин или пароль");
         },
      });
      return mutation;
   },
   useRegisterMutation: (messageApi: MessageInstance) => {
      const mutation = useMutation({
         mutationFn: authServices.register,
         onSuccess: () => {
            messageApi.success("Вы успешно вошли в систему");
         },
         onError: () => {
            messageApi.error("Неправильный логин или пароль");
         },
      });
      return mutation;
   },
   useGetMe: () => {
      const query = useQuery({
         queryFn: authServices.getMe,
         queryKey: ["me"],
      });
      return query;
   },
   useLogout: () => {
      return useMutation({
         mutationFn: authServices.logout,
      });
   },
};
