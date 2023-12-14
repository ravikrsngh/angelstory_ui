
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userClient } from "..";

type TriggerOTPInputType = {
  email: string;
};

const triggerOTP = (input:TriggerOTPInputType) => {
      return userClient
        .post("users/trigger-otp", { json: input })
        .json()
}

export function useTriggerOTP() {
  return useMutation({
    mutationFn: (input:TriggerOTPInputType) => triggerOTP(input),
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}