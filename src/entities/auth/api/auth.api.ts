import { useMutation, useQueryClient } from "@tanstack/react-query";
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
   useLogout: () => {
      return useMutation({
         mutationFn: authServices.logout,
      });
   },
};
