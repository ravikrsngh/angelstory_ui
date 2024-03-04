import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type CreateJourneyType = {
  collectionId: number;
  journeyName: string;
};

const createJourney = (input: CreateJourneyType) => {
  return userAuthClient.post("journeys", { json: input }).json();
};

export function useCreateJourney() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateJourneyType) => createJourney(input),
    onSuccess: () => {
      toast.success("Journey created successfully.");
      queryClient.invalidateQueries({
        queryKey: ["collection-details-journeys"],
      });
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
