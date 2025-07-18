import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authServices } from "./auth.services";

export const authApi = {
   useLoginMutation: () => {
      const queryClient = useQueryClient();
      const mutation = useMutation({
         mutationFn: authServices.login,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
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
