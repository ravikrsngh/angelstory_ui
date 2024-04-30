import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";

export type SharedEntityResType = {
  accessRight: string;
  accessType: string;
  approvalRequired: boolean;
  entityId: number;
  id: number;
  userId: number;
  name: string;
  bgImage: string;
};

const getAllAccessRightForEntity = () => {
  return userAuthClient
    .get("access-rights/shared")
    .json<SharedEntityResType[]>();
};

export function useGetSharedEntity() {
  return useQuery({
    queryKey: ["shared-entity"],
    queryFn: () => getAllAccessRightForEntity(),
  });
}
