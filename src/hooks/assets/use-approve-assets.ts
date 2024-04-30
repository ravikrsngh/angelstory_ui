import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type createAssetType = {
  approvalDecision: string;
  assetId: number;
};

const createAsset = (input: createAssetType) => {
  return userAuthClient.post("approval-request", { json: input }).json();
};

export function useApproveAssets() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: createAssetType) => createAsset(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collection-details-assets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["journey-details-assets"],
      });
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
