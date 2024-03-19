import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";

const getAllAccessRightForEntity = (entityType: string) => {
  return userAuthClient
    .get("access-rights?type=" + entityType)
    .json<string[]>();
};

export function useGetAllAccessRightForEntity(entityType: string) {
  return useQuery({
    queryKey: ["access-right", entityType],
    queryFn: () => getAllAccessRightForEntity(entityType),
  });
}
