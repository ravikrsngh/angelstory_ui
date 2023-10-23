import { Input } from "../ui/input";
import AccountDashboardHeading from "./account-dashboard-heading";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function AccountSetting() {
  return (
    <div>
      <AccountDashboardHeading name="Your Profile" />
      <form className="max-w-5xl">
        <div className="">
          <div className="flex items-center gap-x-3 mb-10">
            <div>
              <UserCircleIcon
                className="w-[72px] text-gray-300"
                aria-hidden="true"
              />
            </div>
            <input
              type="file"
              name="profile_picture"
              id="profile_picture"
              className="h-0 w-0"
            />
            <label
              htmlFor="profile_picture"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Change
            </label>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="grow">
              <Input label="Name" />
            </div>
            <div className="grow">
              <Input label="Email" />
            </div>
            <div className="grow">
              <Input label="Phone Number" />
            </div>
            <div></div>
            <div></div>
            <div className="flex w-full justify-end">
              <button className="bg-primary-400 text-white font-medium px-6 py-2 rounded-sm">
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
