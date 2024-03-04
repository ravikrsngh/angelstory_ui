import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { templateAuthClient } from "..";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      templateAuthClient.delete(`projects/${id}/`).json(),
    onSuccess: () => {
      toast.success("Memory deleted.");
      queryClient.invalidateQueries({
        queryKey: ["journey-details-memories"],
      });
    },
    onError: () => toast.error("Error while deleting the project."),
  });
};
