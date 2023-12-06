import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

export const useDeleteCollection = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (collectionID: number) =>
        userAuthClient
          .delete(`collections/${collectionID}/`)
          .json(),
      onSuccess: () => {
        toast.success("Collection removed.");
        queryClient.invalidateQueries({
          queryKey: ["collections"],
        });
      },
      onError: () => toast.error("Error deleting "),
    });
  };
  