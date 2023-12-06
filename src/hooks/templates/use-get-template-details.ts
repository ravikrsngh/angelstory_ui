import { useQuery } from "@tanstack/react-query";
import { templateAuthClient } from "..";

const getTemplateDetails = (id:number) => {
  return templateAuthClient.get("templates/" + id).json();
};

export function useGetTemplateDetails(id:number) {
  return useQuery({
    enabled:false,
    queryKey: ["templates", id],
    queryFn: () => getTemplateDetails(id),
  });
}
