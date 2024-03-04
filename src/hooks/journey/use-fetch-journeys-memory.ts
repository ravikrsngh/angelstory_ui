import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { JourneyWithMemoriesType } from "../../types";

const getCollectionJourneys = (journeyId: string) => {
  return userAuthClient
    .get(`journeys/${journeyId}/projects`)
    .json<JourneyWithMemoriesType>();
};

export function useGetJourneysMemories(journeyId: string) {
  return useQuery({
    queryKey: ["journey-details-memories", journeyId],
    queryFn: () => getCollectionJourneys(journeyId),
  });
}
