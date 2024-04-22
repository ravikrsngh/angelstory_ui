import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { userAuthClient } from "..";

export type moveAssetType = {
  mode: string;
  newCollectionId: number;
  newJourneyId?: number;
  assetIds: number[];
};
const saveCollection = (input: moveAssetType) => {
  console.log(input);
  if (input.mode == "MOVE") {
    return userAuthClient.put("assets/move", { json: input }).json();
  } else {
    return userAuthClient.put("assets/copy", { json: input }).json();
  }
};

export function useMoveAssets() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: moveAssetType) => saveCollection(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collection-assets"],
      });
    },
    onError: (error) =>
      error instanceof HTTPError && console.log(error.message),
  });
}
