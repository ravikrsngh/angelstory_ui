import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { CollectionType } from "../../types";

const getAllCollectionForUser = (userId: string) => {
  return userAuthClient.get("collections/user/" + userId).json<CollectionType[]>();
};

export function useGetAllCollectionForUser(userId: string) {
  return useQuery({
    queryKey: ["collections",userId],
    queryFn: () => getAllCollectionForUser(userId),
  });
}
