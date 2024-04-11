import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { AssetResType } from "../../types";

type CollectionResponseType = {
  id: number;
  name: string;
  createdAt: string;
  createdBy: number;
  bgColor: string;
  accessRight: string;
  assetList: AssetResType[];
};

const getAssetsFromCollection = (id: number) => {
  return userAuthClient
    .get("assets/collection/" + id)
    .json<CollectionResponseType>();
};

export function useGetAssetsFromCollection(id: number) {
  return useQuery({
    queryKey: ["collection-assets", id],
    queryFn: () => getAssetsFromCollection(id),
  });
}
