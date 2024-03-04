import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { templateAuthClient } from "..";

type saveCollectionPayloadType = {
  mode: string;
  collectionId: number;
  journeyId: number;
  projectId: number[];
};
const saveCollection = (input: saveCollectionPayloadType) => {
  console.log(input);
  if (input.mode == "MOVE") {
    return templateAuthClient.put("projects/move", { json: input }).json();
  } else {
    return templateAuthClient.put("projects/copy", { json: input }).json();
  }
};

export function useMoveProjects() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: saveCollectionPayloadType) => saveCollection(input),
    onSuccess: () => {
      toast.success("Move/Copy action done successfully.");
      queryClient.invalidateQueries({
        queryKey: ["journey-details-memories"],
      });
    },
    onError: (error) =>
      error instanceof HTTPError && console.log(error.message),
  });
}
