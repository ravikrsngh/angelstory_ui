import { useQuery } from "@tanstack/react-query";
import { templateAuthClient } from "..";
import { DesignType } from "../../types";

const getProjectsFromCollection = (id:number) => {
  return templateAuthClient.get("projects/collection/" + id).json<DesignType[]>();
};

export function useGetProjectsFromCollection(id:number) {
  return useQuery({
    queryKey: ["collection-projects", id],
    queryFn: () => getProjectsFromCollection(id),
  });
}
