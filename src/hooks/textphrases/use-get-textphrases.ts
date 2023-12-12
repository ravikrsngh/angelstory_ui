import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { TextPhrase } from "../../types";

const getTextPhrase = () => {
  return userAuthClient.get("textphrases/getAll").json<TextPhrase[]>();
};

export function useGetTextPhrases() {
  return useQuery({
    queryKey: ['textphrase'],
    queryFn: () => getTextPhrase(),
  });
}
