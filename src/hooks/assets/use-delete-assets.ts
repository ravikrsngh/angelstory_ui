import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

export const useDeleteAssets = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: number[]) =>
      userAuthClient.post(`assets/delete`, { json: { ids: ids } }).json(),
    onSuccess: () => {
      toast.success("Asset Deleted Successfully.");
      queryClient.invalidateQueries({
        queryKey: ["collection-details-assets"],
      });
    },
    onError: () => toast.error("Error while deleting the assets"),
  });
};
