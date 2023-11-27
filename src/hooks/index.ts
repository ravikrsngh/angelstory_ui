import ky, { HTTPError } from "ky";
import Cookies from "js-cookie";

const beforeErrorHook = async (error: HTTPError) => {
    const response = await error.response.json();
    error.message =
      response.messageDescription ?? "Something went wrong!!";
    return error;
  };
  
  export const userClient = ky.extend({
    prefixUrl: 'http://52.56.110.44:8080/',
    hooks: {
      beforeError: [beforeErrorHook],
    },
  });

  export const userAuthClient = ky.extend({
    prefixUrl: 'http://52.56.110.44:8080/',
    hooks: {
      beforeRequest: [
        (request) => {
          const token = Cookies.get('access');
          request.headers.set("Authorization", `Bearer ${token}`);
        },
      ],
      beforeError: [beforeErrorHook],
    },
  });
  
  export const templateClient = ky.extend({
    prefixUrl: 'http://52.56.110.44:8081/',
    hooks: {
      beforeError: [beforeErrorHook],
    },
  });

  export const templateAuthClient = ky.extend({
    prefixUrl: 'http://52.56.110.44:8081/',
    hooks: {
      beforeRequest: [
        (request) => {
          const token = Cookies.get('access');
          request.headers.set("Authorization", `Bearer ${token}`);
        },
      ],
      beforeError: [beforeErrorHook],
    },
  });