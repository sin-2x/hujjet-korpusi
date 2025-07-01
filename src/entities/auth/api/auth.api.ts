import { useMutation, useQuery } from "@tanstack/react-query";
import { authServices } from "./auth.services";
import { message } from "antd";

export const authApi = {
   useLoginMutation: () => {
      const mutation = useMutation({
         mutationFn: authServices.login,
         onSuccess: () => {
            message.success("Вы успешно вошли в систему");
         },
         onError: () => {
            message.error("Неправильный логин или пароль");
         },
      });
      return mutation;
   },
   useRegisterMutation: () => {
      const mutation = useMutation({
         mutationFn: authServices.register,
         onSuccess: () => {
            message.success("Вы успешно вошли в систему");
         },
         onError: () => {
            message.error("Неправильный логин или пароль");
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
