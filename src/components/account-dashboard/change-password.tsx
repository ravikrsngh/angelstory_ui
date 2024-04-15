import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import * as HoverCard from "@radix-ui/react-hover-card";
import toast from "react-hot-toast";
import { useChangePassword } from "../../hooks/user/use-change-password";
import AccountDashboardHeading from "./account-dashboard-heading";

export default function ChangePassword() {
  const changePasswordHoook = useChangePassword();
  const changePasswordSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const np = formData.get("new_password") as string;
    const cfm_np = formData.get("cfm_new_password") as string;
    const op = formData.get("old_password") as string;
    if (np != cfm_np) {
      toast.error("Password does not match.");
      return;
    }
    changePasswordHoook.mutate({
      newPassword: np,
      oldPassword: op,
    });
  };
  return (
    <div>
      <AccountDashboardHeading name="Change Password" />
      <form
        className="max-w-3xl flex flex-col gap-7"
        onSubmit={changePasswordSubmitHandler}
      >
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
            name="old_password"
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
            name="new_password"
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
            name="cfm_new_password"
          />
        </div>
        <div className="flex w-full justify-end">
          <button className="bg-primary-400 text-white font-medium px-6 py-2 rounded-sm">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
