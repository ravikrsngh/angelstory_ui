import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type DeleteUserPermissionType = {
  accessRight: string;
  userIds: number[];
  entityId: number;
  accessType: string;
  approvalRequired: boolean;
};

const createCollection = (input: DeleteUserPermissionType) => {
  return userAuthClient.delete("access-rights", { json: input }).json();
};

export function useDeleteUserPermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: DeleteUserPermissionType) => createCollection(input),
    onSuccess: () => {
      queryClient.invalidateQueries(["access-right"]);
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
