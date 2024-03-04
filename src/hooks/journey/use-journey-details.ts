import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { JourneyDetailsResType } from "../../types";

const getJourneyDetails = (journeyId: string) => {
  return userAuthClient
    .get("journeys/" + journeyId)
    .json<JourneyDetailsResType>();
};

export function useGetJourneyDetails(journeyId: string) {
  return useQuery({
    queryKey: ["journey-details", journeyId],
    queryFn: () => getJourneyDetails(journeyId),
  });
}
