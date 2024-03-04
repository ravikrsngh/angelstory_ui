import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { CollectionLevelResType } from "../../types";

const getCollectionLevel = () => {
  return userAuthClient
    .get("collections/hierarchy/")
    .json<CollectionLevelResType[]>();
};

export function useGetCollectionLevel() {
  return useQuery({
    queryKey: ["collections-levels"],
    queryFn: () => getCollectionLevel(),
  });
}
