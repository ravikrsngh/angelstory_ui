
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userClient } from "..";

type SignUpInputType = {
  email: string;
  name: string;
  password: string;
};

const signup = (input:SignUpInputType) => {
      return userClient
        .post("users/signup", { json: input })
        .json()
}

export function useSingUp() {
  return useMutation({
    mutationFn: (input:SignUpInputType) => signup(input),
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}