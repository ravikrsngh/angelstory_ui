
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type CreateCollectionType = {
    collectionName: string
};

const createCollection = (input:CreateCollectionType) => {
      return userAuthClient
        .post("collections", { json: input })
        .json()
}

export function useCreateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input:CreateCollectionType) => createCollection(input),
    onSuccess:(res) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}