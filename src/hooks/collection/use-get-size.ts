import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { CollectionType } from "../../types";

const getAllSizes = () => {
  return userAuthClient.get("sizes/getAll").json<CollectionType[]>();
};

export function useGetAllSizes() {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: () => getAllSizes(),
  });
}
