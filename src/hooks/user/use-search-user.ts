import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { UserSearchResType } from "../../types";

const getUserDetails = (text: string) => {
  return userAuthClient
    .get("users/search?text=" + text)
    .json<UserSearchResType[]>();
};

export function useSearchUser(text: string) {
  return useQuery({
    queryKey: ["user-search"],
    queryFn: () => getUserDetails(text),
    retry: false,
    enabled: false,
  });
}
