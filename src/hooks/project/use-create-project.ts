
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { templateAuthClient } from "..";
import { CreateProjectInputType } from "../../types";


const createProject = (input:CreateProjectInputType) => {
        console.log(input)
      return templateAuthClient
        .post("projects", { json: input })
        .json()
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input:CreateProjectInputType) => createProject(input),
    onSuccess:(res) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}