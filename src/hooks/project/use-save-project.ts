
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { templateAuthClient } from "..";


const saveProject = (input) => {
        console.log(input)
      return templateAuthClient
        .put("projects", { json: input })
        .json()
}

export function useSaveProject() {
  return useMutation({
    mutationFn: (input) => saveProject(input),
    onError: (error) =>
      error instanceof HTTPError && console.log(error.message),
  });
}