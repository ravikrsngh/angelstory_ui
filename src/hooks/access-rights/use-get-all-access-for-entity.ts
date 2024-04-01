import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";

const getAllAccessRightForEntity = (entityType: string, entityId: number) => {
  return userAuthClient
    .get("access-rights/fetch?type=" + entityType + `&entityId=${entityId}`)
    .json<string[]>();
};

export function useGetAllUserAccessForEntity(
  entityType: string,
  entityId: number
) {
  return useQuery({
    queryKey: ["access-right", entityType, entityId],
    queryFn: () => getAllAccessRightForEntity(entityType, entityId),
  });
}
