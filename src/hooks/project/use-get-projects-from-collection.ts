import { useQuery } from "@tanstack/react-query";
import { templateAuthClient } from "..";

const getProjectsFromCollection = (id:number) => {
  return templateAuthClient.get("projects/collection/" + id).json();
};

export function useGetProjectsFromCollection(id:number) {
  return useQuery({
    queryKey: ["collection-projects", id],
    queryFn: () => getProjectsFromCollection(id),
  });
}
