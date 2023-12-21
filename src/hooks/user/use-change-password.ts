import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { userAuthClient } from "..";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type changePasswordInputType = {
    newPassword: string,
    oldPassword: string
}
const changePassword = (input:changePasswordInputType) => {
      return userAuthClient
        .post("users/update-password", { json: input })
        .json()
}

export function useChangePassword() {
    const navigate = useNavigate()

  return useMutation({
    mutationFn: (input:changePasswordInputType) => changePassword(input),
    onSuccess: () => {
        Cookies.remove('access');
        toast.success("Password changed successfully.")
        navigate('/login')
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });

}