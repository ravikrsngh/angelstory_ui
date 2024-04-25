import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type UpdateUserPermissionType = {
  accessRight: string;
  userId: number;
  entityId: number;
  accessType: string;
};

const createCollection = (input: UpdateUserPermissionType) => {
  return userAuthClient.put("access-rights", { json: input }).json();
};

export function useUpdateUserPermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateUserPermissionType) => createCollection(input),
    onSuccess: () => {
      queryClient.invalidateQueries(["access-right"]);
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
