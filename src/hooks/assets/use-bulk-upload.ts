import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userAuthClient } from "..";

export type createBulkAssetType = {
  assetList: { assetType: string; assetUrl: string; name: string }[];
  collectionId: number;
  journeyId?: number;
  memory: boolean;
};

const createAsset = (input: createBulkAssetType) => {
  return userAuthClient.post("assets/bulk-upload", { json: input }).json();
};

export function useBulkCreateAssets() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (input: createBulkAssetType) => createAsset(input),
    onSuccess: () => {
      toast.success("Upload successfull.");
      navigate(`/dashboard`);
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
