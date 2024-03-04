import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type saveCollectionPayloadType = {
  mode: string;
  collectionId: number;
  journeyId: number[];
};
const saveCollection = (input: saveCollectionPayloadType) => {
  console.log(input);
  if (input.mode == "MOVE") {
    return userAuthClient.put("journeys/move", { json: input }).json();
  } else {
    return userAuthClient.put("journeys/copy", { json: input }).json();
  }
};

export function useMoveJourney() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: saveCollectionPayloadType) => saveCollection(input),
    onSuccess: () => {
      toast.success("Updated journey details.");
      queryClient.invalidateQueries({
        queryKey: ["collection-details-journeys", "journey-details"],
      });
    },
    onError: (error) =>
      error instanceof HTTPError && console.log(error.message),
  });
}
