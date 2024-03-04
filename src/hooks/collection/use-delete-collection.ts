import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { userAuthClient } from "..";

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (collectionID: number) =>
      userAuthClient.delete(`collections/${collectionID}/`).json(),
    onSuccess: () => {
      toast.success("Collection removed.");
      if (/^\/collection\/\d+$/.test(location.pathname)) {
        navigate("/dashboard");
      } else {
        queryClient.invalidateQueries({
          queryKey: ["collections"],
        });
      }
    },
    onError: () => toast.error("Error deleting "),
  });
};
