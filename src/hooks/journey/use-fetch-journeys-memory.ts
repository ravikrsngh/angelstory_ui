import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { JourneyWithMemoriesType } from "../../types";

export type JourneysMemoriesQueryParams = {
  startDate?: string | null;
  endDate?: string | null;
  sortBy?: string;
};

const getCollectionJourneys = (
  journeyId: string,
  params: JourneysMemoriesQueryParams = {}
) => {
  if (!params.startDate) {
    delete params["startDate"];
  }
  if (!params.endDate) {
    delete params["endDate"];
  }
  return userAuthClient
    .post(`journeys/${journeyId}/projects`, { json: params })
    .json<JourneyWithMemoriesType>();
};

export function useGetJourneysMemories(
  journeyId: string,
  params: JourneysMemoriesQueryParams = {}
) {
  return useQuery({
    queryKey: ["journey-details-memories", journeyId],
    queryFn: () => getCollectionJourneys(journeyId, params),
  });
}
