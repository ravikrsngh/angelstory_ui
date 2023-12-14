
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userClient } from "..";

type ResetPasswordInputType = {
  username: string;
  password: string
};

const resetPassword = (input:ResetPasswordInputType) => {
      return userClient
        .post("users/reset-password", { json: input })
        .json()
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (input:ResetPasswordInputType) => resetPassword(input),
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}