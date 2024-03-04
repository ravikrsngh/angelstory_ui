import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { templateAuthClient } from "..";
import { DesignUpdateType } from "../../types";

const saveProject = (input: DesignUpdateType) => {
  console.log(input);
  return templateAuthClient.put("projects", { json: input }).json();
};

export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: DesignUpdateType) => saveProject(input),
    onSuccess: () => {
      toast.success("Saved Current Project Status.");
      queryClient.invalidateQueries(["journey-details-memories"]);
    },
    onError: (error) =>
      error instanceof HTTPError && console.log(error.message),
  });
}
