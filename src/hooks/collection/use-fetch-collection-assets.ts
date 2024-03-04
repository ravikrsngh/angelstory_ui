import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { CollectionAssetsResType } from "../../types";

const getCollectionAssets = (collectionId: string) => {
  return userAuthClient
    .get(`collections/${collectionId}/assets`)
    .json<CollectionAssetsResType>();
};

export function useGetCollectionAssets(collectionId: string) {
  return useQuery({
    queryKey: ["collection-details-assets", collectionId],
    queryFn: () => getCollectionAssets(collectionId),
  });
}
