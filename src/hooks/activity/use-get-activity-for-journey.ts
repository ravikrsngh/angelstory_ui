import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { ActivityResType } from "../../types";

const getActivity = (id: string) => {
  return userAuthClient
    .get("activities/journey/" + id)
    .json<ActivityResType[]>();
};

export function useGetActivityJourney(id: string) {
  return useQuery({
    queryKey: ["activity-journey"],
    queryFn: () => getActivity(id),
  });
}
