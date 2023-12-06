import { useQuery } from "@tanstack/react-query";
import { templateAuthClient } from "..";

const getProjectDetails = (id:number) => {
  return templateAuthClient.get("projects/" + id).json();
};

export function useGetProjectDetails(id:number) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectDetails(id),
  });
}