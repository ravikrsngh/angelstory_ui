import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { templateAuthClient } from "..";

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: number) =>
        templateAuthClient
          .delete(`projects/${id}/`)
          .json(),
      onSuccess: () => {
        toast.success("Project deleted.");
        queryClient.invalidateQueries({
          queryKey: ["collection-projects"],
        });
      },
      onError: () => toast.error("Error while deleting the project."),
    });
  };
  