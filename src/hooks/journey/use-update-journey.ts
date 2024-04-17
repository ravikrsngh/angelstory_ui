import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type saveCollectionPayloadType = {
  bgColor?: string;
  journeyId: number;
  journeyName?: string;
  bgImage?: string;
};
const saveCollection = (input: saveCollectionPayloadType) => {
  console.log(input);
  return userAuthClient.put("journeys", { json: input }).json();
};

export function useUpdateJourney() {
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
