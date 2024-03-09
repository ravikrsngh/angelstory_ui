import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type createAssetType = {
  assetType: string;
  assetUrl: string;
  collectionId: number;
  journeyId: number;
  projectId: number;
};

const createAsset = (input: createAssetType) => {
  return userAuthClient.post("assets", { json: input }).json();
};

export function useCreateAssets() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: createAssetType) => createAsset(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
