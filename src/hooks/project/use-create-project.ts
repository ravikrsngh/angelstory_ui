import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast, { Renderable, Toast, ValueFunction } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { templateAuthClient } from "..";
import {
  CreateProjectPayloadType,
  MemoryTypes,
  ProjectResType,
} from "../../types";

const createProject = (input: CreateProjectPayloadType) => {
  console.log(input);
  return templateAuthClient.post("projects", { json: input }).json();
};

export function useCreateProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (input: CreateProjectPayloadType) => createProject(input),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (
        [MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(
          (res as ProjectResType).projectType
        )
      ) {
        navigate(
          `/design/${(res as ProjectResType).collectionId}/${
            (res as ProjectResType).journeyId
          }/${(res as ProjectResType).id}`
        );
      } else {
        navigate(`/journey/${(res as ProjectResType).journeyId}`);
      }
    },
    onError: (error: {
      message: Renderable | ValueFunction<Renderable, Toast>;
    }) => error instanceof HTTPError && toast.error(error.message),
  });
}
