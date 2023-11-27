import { useQuery } from "@tanstack/react-query";
import { templateAuthClient } from "..";
import { TemplateType } from "../../types";

const getAllTemplates = () => {
  return templateAuthClient.get("templates/getAll").json<TemplateType[]>();
};

export function useGetAllTemplate() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: () => getAllTemplates(),
  });
}
