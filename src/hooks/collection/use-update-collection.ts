import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type saveCollectionPayloadType = {
  bgColor?: string;
  collectionId: number;
  collectionName?: string;
};
const saveCollection = (input: saveCollectionPayloadType) => {
  console.log(input);
  return userAuthClient.put("collections", { json: input }).json();
};

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: saveCollectionPayloadType) => saveCollection(input),
    onSuccess: () => {
      toast.success("Updated collection details.");
      queryClient.invalidateQueries({
        queryKey: ["collection-details"],
      });
    },
    onError: (error) =>
      error instanceof HTTPError && console.log(error.message),
  });
}
