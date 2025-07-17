import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService } from "./delete.service";
import type { DeleteType } from "@/shared";

export const useDeleteUserMutation = (
   endpoint?: DeleteType,
   queryKey?: string
) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (id: string | React.Key) => deleteService(id, endpoint),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [queryKey],
            exact: false,
         });
      },
   });
};
