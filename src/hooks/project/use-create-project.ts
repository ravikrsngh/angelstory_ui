
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { templateAuthClient } from "..";
import { CreateProjectInputType } from "../../types";
import { useNavigate } from "react-router-dom";


const createProject = (input:CreateProjectInputType) => {
        console.log(input)
      return templateAuthClient
        .post("projects", { json: input })
        .json()
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (input:CreateProjectInputType) => createProject(input),
    onSuccess:(res) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate(`/design/${res.collectionId}/${res.id}`)
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}