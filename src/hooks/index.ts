import Cookies from "js-cookie";
import ky, { HTTPError } from "ky";

const beforeErrorHook = async (error: HTTPError) => {
  const response = await error.response.json();
  error.message = response.messageDescription ?? "Something went wrong!!";
  return error;
};

export const userClient = ky.extend({
  prefixUrl: "https://api-dev.myangeljourney.com/",
  hooks: {
    beforeError: [beforeErrorHook],
  },
});

export const userAuthClient = ky.extend({
  prefixUrl: "https://api-dev.myangeljourney.com/",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get("access");
        request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
    beforeError: [beforeErrorHook],
  },
});

export const templateClient = ky.extend({
  prefixUrl: "https://api-dev2.myangeljourney.com/",
  hooks: {
    beforeError: [beforeErrorHook],
  },
});

export const templateAuthClient = ky.extend({
  prefixUrl: "https://api-dev2.myangeljourney.com/",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get("access");
        request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
    beforeError: [beforeErrorHook],
  },
});
