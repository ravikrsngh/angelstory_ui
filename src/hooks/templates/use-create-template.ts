import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import toast from "react-hot-toast";
import { templateAuthClient } from "..";

type createTemplateInput = {
  collectionId: number;
  formattedData: string;
  name: string;
  premium: boolean;
  previewImage: string;
  price: number;
};

const createTemplate = (input:createTemplateInput) => {
    console.log(input)
      return templateAuthClient
        .post("templates", { json: input })
        .json()
}

export function useCreateTemplate() {
  return useMutation({
    mutationFn: (input:createTemplateInput) => createTemplate(input),
    onSuccess:(res) => {
        console.log(res)
        toast.success("Template created successfully.")
    },
    onError: (error) =>
      error instanceof HTTPError && toast.error(error.message),
  });
}