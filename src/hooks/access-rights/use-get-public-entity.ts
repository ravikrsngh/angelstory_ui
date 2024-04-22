import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { PublicEntityResType } from "../../types";

const getAllAccessRightForEntity = (publicId: string) => {
  return userAuthClient
    .get(`public-link/fetch-entity?link=${publicId}`)
    .json<PublicEntityResType>();
};

export function useGetPublicEntity(publicId: string) {
  return useQuery({
    queryKey: ["public-entity", publicId],
    queryFn: () => getAllAccessRightForEntity(publicId),
  });
}
