import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { UserDetailsResType } from "../../types";

const getUserDetails = () => {
  return userAuthClient.get("users/getDetails").json<UserDetailsResType>();
};

export function useGetUserDetails() {
  return useQuery({
    queryKey: ['user-details'],
    queryFn: () => getUserDetails(),
  });
}
