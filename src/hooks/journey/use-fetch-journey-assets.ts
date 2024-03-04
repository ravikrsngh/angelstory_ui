import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { JourneyWithAssetType } from "../../types";

const getCollectionAssets = (journeyId: string) => {
  return userAuthClient
    .get(`journeys/${journeyId}/assets`)
    .json<JourneyWithAssetType>();
};

export function useGetJourneyAssets(journeyId: string) {
  return useQuery({
    queryKey: ["journey-details-assets", journeyId],
    queryFn: () => getCollectionAssets(journeyId),
  });
}
