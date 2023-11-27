import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userClient } from "..";

export function useVerifyUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ userId, otp }: { userId: number; otp: string }) => {
      return userClient
        .post("users/verify-user", { json: { userId, otp } })
        .json();
    },
    onSuccess: () => {
      toast.success("Otp Verifed. You can login now.");
      navigate("/login");
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
