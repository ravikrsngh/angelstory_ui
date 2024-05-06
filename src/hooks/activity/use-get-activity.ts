import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { ActivityResType } from "../../types";

const getActivity = () => {
  return userAuthClient.get("activities").json<ActivityResType[]>();
};

export function useGetActivity() {
  return useQuery({
    queryKey: ["activity"],
    queryFn: () => getActivity(),
  });
}
