
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type createTextPhraseType = {
    formattedData: string;
    previewImg: string
}

const createTextPhrase = (input:createTextPhraseType) => {
      return userAuthClient
        .post("textphrases", { json: input })
        .json()
}

export function useCreateTextPhrase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input:createTextPhraseType) => createTextPhrase(input),
    onSuccess:(res) => {
      queryClient.invalidateQueries({ queryKey: ["textphrase"] });
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}