import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { ActivityResType } from "../../types";

const getActivity = (id: string) => {
  return userAuthClient
    .get("activities/collection/" + id)
    .json<ActivityResType[]>();
};

export function useGetActivityCollection(id: string) {
  return useQuery({
    queryKey: ["activity-collection"],
    queryFn: () => getActivity(id),
  });
}
