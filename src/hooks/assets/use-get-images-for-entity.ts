import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";

const getAssetsFromCollection = (id: number, entityType: string) => {
  console.log("Heyyyy");
  return userAuthClient
    .get(`assets/entity/${entityType}/${id}`)
    .json<string[]>();
};

export function useGetImagesForEntity(id: number, entityType: string) {
  return useQuery({
    queryKey: ["images", entityType, id],
    queryFn: () => getAssetsFromCollection(id, entityType),
  });
}
