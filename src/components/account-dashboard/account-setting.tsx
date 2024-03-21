import { UserCircleIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { useGetUserDetails } from "../../hooks/user/use-get-user-details";
import { useSaveUserDetails } from "../../hooks/user/use-save-user-details";
import { Input } from "../ui/input";
import AccountDashboardHeading from "./account-dashboard-heading";

export default function AccountSetting() {
  const { data, isLoading, isFetching, isError } = useGetUserDetails();
  const saveUserDetailsHook = useSaveUserDetails();

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      ...data,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      mobileNumber: formData.get("mobileNumber") as string,
    };
    saveUserDetailsHook.mutate(payload, {
      onSuccess: () => {
        toast.success("Details updated successfully.");
      },
    });
  };

  if (isLoading || isFetching) {
    return (
      <>
        <div className="p-5">
          <span>Loading ...</span>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="p-5">
          <span>Something went wrong ...</span>
        </div>
      </>
    );
  }

  return (
    <div>
      <AccountDashboardHeading name="Your Profile" />
      <form className="max-w-5xl" onSubmit={handleSaveSubmit}>
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
          <div className="grid md:grid-cols-2 gap-8">
            <div className="grow opacity-60">
              <Input
                label="Username"
                name="userName"
                defaultValue={data.userName}
                disabled
              />
            </div>
            <div className="grow opacity-60">
              <Input
                label="Email"
                name="email"
                defaultValue={data.email}
                disabled
              />
            </div>
            <div className="grow">
              <Input
                label="First Name"
                name="firstName"
                defaultValue={data.firstName}
              />
            </div>
            <div className="grow">
              <Input
                label="Last Name"
                name="lastName"
                defaultValue={data.lastName}
              />
            </div>
            <div className="grow">
              <Input
                label="Phone Number"
                name="mobileNumber"
                defaultValue={data.mobileNumber}
              />
            </div>
            <div className=""></div>
            <div className="hidden md:block"></div>
            <div className="flex w-full justify-end">
              <button className=" w-full md:w-fit bg-primary-400 text-white font-medium px-6 py-2 rounded-sm">
                SAVE CHANGES
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
