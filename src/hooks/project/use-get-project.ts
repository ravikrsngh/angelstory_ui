import { useQuery } from "@tanstack/react-query";
import { templateAuthClient } from "..";
import { ProjectResType } from "../../types";

const getProjectDetails = (id: number) => {
  return templateAuthClient.get("projects/" + id).json<ProjectResType>();
};

export function useGetProjectDetails(id: number) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectDetails(id),
  });
}
