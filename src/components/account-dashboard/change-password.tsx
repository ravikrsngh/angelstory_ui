import AccountDashboardHeading from "./account-dashboard-heading";
import * as HoverCard from "@radix-ui/react-hover-card";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function ChangePassword() {
  return (
    <div>
      <AccountDashboardHeading name="Change Password" />
      <form action="" className="max-w-3xl flex flex-col gap-7">
        <div>
          <label
            htmlFor=""
            className="mb-2 text-sm font-medium text-black/90 flex justify-between items-center"
          >
            <span>Old Password</span>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <button>
                  <QuestionMarkCircleIcon className="h-6 w-6" />
                </button>
              </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content>
                  <p className="p-5 bg-primary-50 shadow-sm rounded-sm max-w-xs">
                    If you have forgotten your password, please log out and
                    click on forgotten password from the login screen.
                  </p>
                  <HoverCard.Arrow />
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          </label>
          <input
            type="password"
            className="w-full border-[0.4px] border-slate-400 bg-white px-4 py-3 text-xs focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="mb-2 block text-sm font-medium text-black/90"
          >
            New Password
          </label>
          <input
            type="password"
            className="w-full border-[0.4px] border-slate-400 bg-white px-4 py-3 text-xs focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor=""
            className="mb-2 block text-sm font-medium text-black/90"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full border-[0.4px] border-slate-400 bg-white px-4 py-3 text-xs focus:outline-none"
          />
        </div>
        <div className="flex w-full justify-end">
          <button className="bg-primary-400 text-white font-medium px-6 py-2 rounded-sm">
            CHANGE
          </button>
        </div>
      </form>
    </div>
  );
}
