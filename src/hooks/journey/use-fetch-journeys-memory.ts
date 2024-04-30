import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { JourneyWithMemoriesType } from "../../types";

type queryParams = {
  date?: number;
  month?: number;
  year?: number;
  name?: string;
  sortBy?: string;
};

const getCollectionJourneys = (journeyId: string, params: queryParams = {}) => {
  return userAuthClient
    .post(`journeys/${journeyId}/projects`, { json: params })
    .json<JourneyWithMemoriesType>();
};

export function useGetJourneysMemories(journeyId: string) {
  return useQuery({
    queryKey: ["journey-details-memories", journeyId],
    queryFn: () => getCollectionJourneys(journeyId),
  });
}
