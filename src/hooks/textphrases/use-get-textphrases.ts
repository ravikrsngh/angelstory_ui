import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";

const getTextPhrase = () => {
  return userAuthClient.get("textphrases/getAll").json();
};

export function useGetTextPhrases() {
  return useQuery({
    queryKey: ['textphrase'],
    queryFn: () => getTextPhrase(),
  });
}
