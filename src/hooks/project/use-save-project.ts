
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { templateAuthClient } from "..";
import { DesignUpdateType } from "../../types";
import toast from "react-hot-toast";


const saveProject = (input: DesignUpdateType) => {
        console.log(input)
      return templateAuthClient
        .put("projects", { json: input })
        .json()
}

export function useSaveProject() {
  return useMutation({
    mutationFn: (input: DesignUpdateType) => saveProject(input),
    onSuccess: () => {
      toast.success("Saved Current Project Status.")
    },
    onError: (error) =>
      error instanceof HTTPError && console.log(error.message),
  });
}