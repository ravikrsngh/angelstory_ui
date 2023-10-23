import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { IconBrandGoogle, IconBrandMeta } from "@tabler/icons-react";

export default function SignUp() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <Input label="Name" />
              <Input label="Email" type="email" />
              <Input label="Password" type="password" />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                >
                  Create an Account
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
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-primary-600 hover:text-primary-400"
            >
              Login.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
