import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { templateAuthClient } from "..";

export const useBulkDeleteProjects = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: number[]) =>
      templateAuthClient.post(`projects/delete`, { json: { ids: ids } }).json(),
    onSuccess: () => {
      toast.success("Memories deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["journey-details-memories"],
      });
    },
    onError: () => toast.error("Error while deleting the memories"),
  });
};
