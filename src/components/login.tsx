import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { IconBrandGoogle, IconBrandMeta } from "@tabler/icons-react";
import { useLogin } from "../hooks/user/use-login";

export default function Login() {

  const loginHook = useLogin();

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    loginHook.mutate({username: formData.get('email') as string, password:formData.get('password') as string});
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-4 md:py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl md:text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-0 md:py-12 md:shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmitLogin}>
              <Input label="Email" name="email" />
              <Input label="Password" type="password" name="password" />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-400 focus:ring-primtext-primary-400"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <Link
                    to='/forgot-password'
                    className="font-semibold text-primary-400 hover:text-primary-600"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
                  <IconBrandGoogle className="text-[#ea4335]" />
                  <span className="text-sm font-semibold leading-6 text-[#ea4335]">
                    Google
                  </span>
                </button>
                <button className="flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">
                  <IconBrandMeta className="text-[#1D9BF0]" />
                  <span className="text-sm font-semibold leading-6 text-[#1D9BF0]">
                    Facebook
                  </span>
                </button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-primary-600 hover:text-primary-400"
            >
              Sign Up.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
