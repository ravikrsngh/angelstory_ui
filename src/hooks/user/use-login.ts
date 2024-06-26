import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userClient } from "..";

type LoginInputType = {
  username: string;
  password: string;
};

type LoginResType = {
  jwtToken: string;
  userId: string;
};

const login = (input: LoginInputType) => {
  return userClient.post("users/login", { json: input }).json();
};

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (input: LoginInputType) => login(input),
    onSuccess: (res) => {
      console.log(res);
      Cookies.set("access", (res as LoginResType).jwtToken);
      Cookies.set("user", (res as LoginResType).userId);
      toast.success("Login successful.");
      navigate("/dashboard");
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}
