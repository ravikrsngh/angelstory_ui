import { useMutation } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: (input: UpdateUserPermissionType) => createCollection(input),
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
