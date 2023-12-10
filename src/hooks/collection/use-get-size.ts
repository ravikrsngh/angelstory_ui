import { useQuery } from "@tanstack/react-query";
import { userAuthClient } from "..";
import { SizeResType } from "../../types";

const getAllSizes = () => {
  return userAuthClient.get("sizes/getAll").json<SizeResType[]>();
};

export function useGetAllSizes() {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: () => getAllSizes(),
  });
}
