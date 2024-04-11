import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";

const getAllAccessRightForEntity = (entityType: string, entityId: number) => {
  return userAuthClient
    .get(`public-link/public-link?type=${entityType}&entityId=${entityId}`)
    .text();
};

export function useGetPublicLink(entityType: string, entityId: number) {
  return useQuery({
    queryKey: ["public-link", entityType, entityId],
    queryFn: () => getAllAccessRightForEntity(entityType, entityId),
    enabled: false,
  });
}
