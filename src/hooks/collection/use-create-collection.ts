
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (input:CreateCollectionType) => createCollection(input),
    onSuccess:(res) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      navigate(`/design/${res.collectionId}/${res.id}`)
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}