import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { CollectionDetailsResType } from "../../types";

const getCollectionDetails = (collectionId: string) => {
  return userAuthClient.get("collections/" + collectionId).json<CollectionDetailsResType>();
};

export function useGetCollectionDetails(collectionId: string) {
  return useQuery({
    queryKey: ["collection-details",collectionId],
    queryFn: () => getCollectionDetails(collectionId),
  });
}