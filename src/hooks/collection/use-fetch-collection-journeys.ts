import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { CollectionJourneyResType } from "../../types";

const getCollectionJourneys = (collectionId: string) => {
  return userAuthClient
    .get(`collections/${collectionId}/journeys`)
    .json<CollectionJourneyResType>();
};

export function useGetCollectionJourneys(collectionId: string) {
  return useQuery({
    queryKey: ["collection-details-journeys", collectionId],
    queryFn: () => getCollectionJourneys(collectionId),
  });
}
