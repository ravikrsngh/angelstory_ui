import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";
import { UserDetailsResType } from "../../types";

const saveUserDetails = (input: UserDetailsResType) => {
  return userAuthClient
    .put("users", { json: input })
    .json<UserDetailsResType>();
};

export function useSaveUserDetails() {
  return useMutation({
    mutationFn: (input: UserDetailsResType) => saveUserDetails(input),
    onError: (error) => {
      error instanceof HTTPError && toast.error(error.message);
    },
  });
}
