import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import {
  DropdownActionModals,
  DropdownActions,
} from "../ui/dropdown-action-buttons";
import dashboard_hero_img from "./../../assets/new1.png";

export const CreateProjectBanner = () => {
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [action, setAction] = useState<number>(0);
  return (
    <>
      <div className="relative rounded-md overflow-hidden h-40 md:h-56 lg:h-auto max-h-96">
        <img
          src={dashboard_hero_img}
          alt=""
          className="h-40 md:h-56 max-w-none lg:h-auto lg:w-full"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <div className="search-bar w-full max-w-3xl px-4 md:px-10 lg:px-16">
            <div>
              <form
                action=""
                className="flex border-[1px] border-slate-400 bg-white rounded-sm"
              >
                <input
                  type="text"
                  placeholder="Search templates"
                  className="grow px-4 py-3 outline-none"
                />
                <button className="px-4 py-3">
                  <IconSearch />
                </button>
              </form>
            </div>
          </div>

          <div className="flex gap-4 justify-center items-center mt-16">
            <button className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500">
              <span className="text-sm lg:text-base font-medium">Events</span>
            </button>
            <button
              className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500"
              onClick={() => {
                setAction(DropdownActions.ADD_MEMORY.id);
                setActionModal(true);
              }}
            >
              <span className="text-sm lg:text-base font-medium">Memory</span>
            </button>
            <button
              className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500"
              onClick={() => {
                setAction(DropdownActions.UPLOAD.id);
                setActionModal(true);
              }}
            >
              <span className="text-sm lg:text-base font-medium">Upload</span>
            </button>
          </div>
        </div>
      </div>
      <DropdownActionModals
        action={action}
        setActionModal={setActionModal}
        actionModal={actionModal}
      />
    </>
  );
};
