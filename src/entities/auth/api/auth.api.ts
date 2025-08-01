import { useMutation } from "@tanstack/react-query";
import { authServices } from "./auth.services";

export const authApi = {
   useLoginMutation: () => {
      const mutation = useMutation({
         mutationFn: authServices.login,
      });
      return mutation;
   },
   useLogout: () => {
      return useMutation({
         mutationFn: authServices.logout,
      });
   },
};

