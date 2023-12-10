
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { templateAuthClient } from "..";
import { DesignUpdateType } from "../../types";


const saveProject = (input: DesignUpdateType) => {
        console.log(input)
      return templateAuthClient
        .put("projects", { json: input })
        .json()
}

export function useSaveProject() {
  return useMutation({
    mutationFn: (input: DesignUpdateType) => saveProject(input),
    onError: (error) =>
      error instanceof HTTPError && console.log(error.message),
  });
}