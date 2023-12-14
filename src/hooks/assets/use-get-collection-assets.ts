import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { AssetResType } from "../../types";

const getAssetsFromCollection = (id:number) => {
  return userAuthClient.get("assets/collection/" + id).json<AssetResType[]>();
};

export function useGetAssetsFromCollection(id:number) {
  return useQuery({
    queryKey: ["collection-assets", id],
    queryFn: () => getAssetsFromCollection(id),
  });
}
