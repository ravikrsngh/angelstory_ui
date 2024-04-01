import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";

type AddUserPermissionType = {
  accessType: string;
  entityId: number;
  accessRight: string;
  userIds: number[];
};

const createCollection = (input: AddUserPermissionType) => {
  return userAuthClient.post("access-rights", { json: input }).json();
};

export function useAddUserPermission() {
  return useMutation({
    mutationFn: (input: AddUserPermissionType) => createCollection(input),
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
