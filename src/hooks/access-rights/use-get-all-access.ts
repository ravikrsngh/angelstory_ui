import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { PermissionType } from "../../types";

const getAllAccessRightForEntity = (entityType: string) => {
  return userAuthClient
    .get("access-rights?type=" + entityType)
    .json<PermissionType[]>();
};

export function useGetAllAccessRightForEntity(entityType: string) {
  return useQuery({
    queryKey: ["access-right", entityType],
    queryFn: () => getAllAccessRightForEntity(entityType),
  });
}
