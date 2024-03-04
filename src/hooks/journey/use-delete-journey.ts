import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

export const useDeleteJourney = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (journeyID: number[]) =>
      userAuthClient
        .delete(`journeys/delete`, { json: { ids: journeyID } })
        .json(),
    onSuccess: () => {
      toast.success("Journey removed.");
      queryClient.invalidateQueries({
        queryKey: ["collection-details-journeys"],
      });
    },
    onError: () => toast.error("Error while deleting the journey"),
  });
};
