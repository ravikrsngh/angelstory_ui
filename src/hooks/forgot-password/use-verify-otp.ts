import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userClient } from "..";

export function useVerifyOTP() {
  return useMutation({
    mutationFn: ({ userId, otp }: { userId: number; otp: string }) => {
      return userClient
        .post("users/verify-otp", { json: { userId, otp } });
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
