import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

export const useDeleteAssets = () => {
    return useMutation({
      mutationFn: (ids: number[]) =>
      userAuthClient
          .post(`assets/deleteById`, {json: {assetIds:ids}})
          .json(),
      onError: () => toast.error("Error while deleting the assets"),
    });
  };
  