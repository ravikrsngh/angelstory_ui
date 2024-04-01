/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Disclosure, Menu, Transition } from "@headlessui/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  IconChevronDown,
  IconChevronUp,
  IconFolderFilled,
} from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { useUpdateUserPermission } from "../../hooks/access-rights/use-update-user-access";
import { PermissionUserCardPropType, TempPropType } from "../../types";
import { cn } from "../../utils";
import dummyImg from "./../../assets/download.jpeg";

export const DeleteModalTemp = () => {
  return (
    <>
      <div className="delete-modal">
        <span className="block mt-4">
          Are you sure you want to delete this [type of object - folder/file] ?
        </span>
        <div className="flex gap-4 justify-end mt-10">
          <button className="bg-red-900 text-white px-10 py-3 rounded-sm">
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export const MoveCopyModalTemp = ({
  initalStage,
  stageList,
  actionLabel,
  action,
}) => {
  //Stage 1 is Collection list, 2 is Journey List, 3 is inside journey.
  const [stage, setStage] = useState<number>(initalStage);
  const [selectedZone, setSelectedZone] = useState(null);
  return (
    <>
      <div className="move-modal">
        <span className="block mt-2">Collection Name / Journey Name</span>

        {stage == 1 && (
          <div className="mt-4 h-[240px] border border-slate-200 flex flex-col">
            <div className="group flex justify-between items-center hover:bg-slate-50 py-3 px-4">
              <div
                className="flex gap-2 items-center text-sm"
                onDoubleClick={() => setStage((prev) => prev + 1)}
              >
                <IconFolderFilled size={20} />
                Collection 1
              </div>
              <button className="hidden group-hover:block text-xs font-medium hover:underline underline-offset-2">
                {actionLabel}
              </button>
            </div>
            <div
              className="group flex justify-between items-center hover:bg-slate-50 py-3 px-4"
              onDoubleClick={() => setStage((prev) => prev + 1)}
            >
              <div className="flex gap-2 items-center text-sm">
                <IconFolderFilled size={20} />
                Collection 2
              </div>
              <button className="hidden group-hover:block text-xs font-medium hover:underline underline-offset-2">
                {actionLabel}
              </button>
            </div>
          </div>
        )}
        {stage == 2 && (
          <div className="mt-4 h-[240px] border border-slate-200 flex flex-col">
            <div
              className="group flex justify-between items-center hover:bg-slate-50 py-3 px-4"
              onDoubleClick={() => setStage((prev) => prev + 1)}
            >
              <div className="flex gap-2 items-center text-sm">
                <IconFolderFilled size={20} />
                Journey 1
              </div>
              <button className="hidden group-hover:block text-xs font-medium hover:underline underline-offset-2">
                {actionLabel}
              </button>
            </div>
            <div
              className="group flex justify-between items-center hover:bg-slate-50 py-3 px-4"
              onDoubleClick={() => setStage((prev) => prev + 1)}
            >
              <div className="flex gap-2 items-center text-sm">
                <IconFolderFilled size={20} />
                Journey 2
              </div>
              <button className="hidden group-hover:block text-xs font-medium hover:underline underline-offset-2">
                {actionLabel}
              </button>
            </div>
          </div>
        )}
        {stage == 3 && (
          <div className="mt-4 h-[240px] border border-slate-200 flex justify-center items-center">
            <button className="bg-primary-400 text-white px-10 py-3 rounded-sm disabled:opacity-75">
              {actionLabel}
            </button>
          </div>
        )}
        <div className="flex gap-4 justify-end mt-10">
          <button
            disabled={stage != stageList.length}
            className="bg-primary-400 text-white px-10 py-3 rounded-sm disabled:opacity-75"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </>
  );
};

export const CopyModalTemp = () => {
  return (
    <>
      <div className="copy-modal">
        <span className="block mt-2">Collection Name / Journey Name</span>
        <div className="mt-4 h-[240px] p-4 border border-slate-200 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <IconFolderFilled />
              Journey
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <IconFolderFilled />
              Journey
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-10">
          <button
            disabled={true}
            className="bg-primary-400 text-white px-10 py-3 rounded-sm disabled:opacity-75"
          >
            Copy here
          </button>
        </div>
      </div>
    </>
  );
};

const permissions = [
  {
    id: 1,
    name: "Collection - View Only",
    description:
      "The user will be able to view all the journies, assets and memories.",
    checkbox_options: [],
  },
  {
    id: 2,
    name: "Collection - Co-owner",
    description:
      "The user will be able to view all the journies, assets and memories.",
    checkbox_options: [
      {
        id: "cb1",
        name: "Approve his adds",
      },
    ],
  },
  {
    id: 3,
    name: "Collection - Add Only",
    description:
      "The user will be able to view all the journies, assets and memories.",
    checkbox_options: [],
  },
  {
    id: 4,
    name: "Collection - Add Only",
    description:
      "The user will be able to view all the journies, assets and memories.",
    checkbox_options: [],
  },
];

export const PermissionUserCard = (props: PermissionUserCardPropType) => {
  const [selectedPermission, setSelectedPermission] = useState<string | null>(
    props.accessRight
  );
  const updateUserAccessHook = useUpdateUserPermission();
  const updateUserAccess = () => {
    updateUserAccessHook.mutate(
      {
        accessRight: selectedPermission,
        userId: props.userId,
        entityId: props.entityId,
        accessType: props.accessType,
      },
      {
        onSuccess: () => {
          setSelectedPermission(selectedPermission);
          toast.success("Update the permission successfully.");
        },
      }
    );
  };

  return (
    <Disclosure as={Fragment}>
      {({ open }) => (
        <>
          <div className="flex gap-2">
            <Disclosure.Button className={cn("outline-none w-full")}>
              <div className="flex gap-3 items-center text-left">
                <div className="h-7 w-7 bg-primary-400 rounded-full"></div>
                <span>
                  {props.name} <br />{" "}
                  <span className="text-sm">{props.accessRight}</span>
                </span>
                {open ? (
                  <IconChevronUp className="ml-auto" />
                ) : (
                  <IconChevronDown className="ml-auto" />
                )}
              </div>
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>
            <Menu
              as="div"
              className="relative w-full inline-block text-left ml-auto"
            >
              <div onClick={(e) => e.stopPropagation()}>
                <Menu.Button className="inline-flex w-full justify-center rounded-md ">
                  <div className="border border-slate-200 py-2 px-3 w-full text-left">
                    <span>{selectedPermission}</span>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 mt-2 w-full origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {props.allAccessRights.map((opt) => (
                      <Menu.Item key={opt.id}>
                        <div
                          className="flex gap-4 p-2 hover:bg-primary-100 hover:cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPermission(opt);
                          }}
                        >
                          <span>{opt}</span>
                        </div>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-3 items-center">
                <input type="checkbox" id="checkbox1" />
                <label htmlFor="checkbox1">Approve additions</label>
              </div>
              <div className="flex gap-3 items-center">
                <input type="checkbox" id="checkbox2" />
                <label htmlFor="checkbox2">Some other permission</label>
              </div>
            </div> */}
            <div className="flex w-full justify-end mt-4">
              <button
                className="bg-primary-400 text-sm text-white px-8 py-2 rounded-sm disabled:opacity-75"
                disabled={selectedPermission == props.accessRight}
                onClick={updateUserAccess}
              >
                Update
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export const ShareModalTemp = () => {
  const [userList, setUserList] = useState(false);
  return (
    <>
      <div className="share-modal">
        <div className="search-bar relative w-full mt-4">
          <div>
            <form
              action=""
              className="flex border-[1px] border-slate-400 bg-white rounded-sm mt-4"
            >
              <input
                type="text"
                placeholder="Search users"
                className="grow px-4 py-3 outline-none"
                onChange={(e) => {
                  if (e.target.value.length > 4) {
                    setUserList(true);
                  } else {
                    setUserList(false);
                  }
                }}
              />
            </form>
            <div className="relative">
              {userList ? (
                <div className="user-list bg-white absolute top-0 w-full shadow-sm left-0">
                  <div className="flex gap-3 items-center p-3 hover:bg-primary-100 border-b border-b-slate-100">
                    <div className="w-7 h-7  rounded-full bg-primary-400"></div>
                    <span>ravi</span>
                  </div>
                  <div className="flex gap-3 items-center p-3 hover:bg-primary-100 border-b border-b-slate-100">
                    <div className="w-7 h-7  rounded-full bg-primary-400"></div>
                    <span>rakesh</span>
                  </div>
                  <div className="flex gap-3 items-center p-3 hover:bg-primary-100 border-b border-b-slate-100">
                    <div className="w-7 h-7  rounded-full bg-primary-400"></div>
                    <span>raj</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="selected-user flex flex-wrap items-center pl-3 py-3">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button className="w-7 h-7 border-2 border-white rounded-full bg-primary-400 hover:border-primary-700 "></button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="TooltipContent bg-white text-primary-700 rounded-sm shadow-md px-3 py-2 text-xs z-10"
                      sideOffset={5}
                    >
                      Ravi Kumar Singh
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button className="w-7 h-7 border-2 border-white rounded-full bg-primary-400 hover:border-primary-700 -ml-2"></button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="TooltipContent bg-white text-primary-700 rounded-sm shadow-md px-3 py-2 text-xs z-10"
                      sideOffset={5}
                    >
                      Sabrina
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button className="w-7 h-7 border-2 border-white rounded-full bg-primary-400 hover:border-primary-700 -ml-2"></button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="TooltipContent bg-white text-primary-700 rounded-sm shadow-md px-3 py-2 text-xs z-10"
                      sideOffset={5}
                    >
                      Ajay
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <div></div>
            </div>
            <div>
              <Menu
                as="div"
                className="relative w-full inline-block text-left ml-auto"
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md ">
                    <div className="border border-slate-200 py-2 px-3 w-full text-left">
                      <span>Collection - View Only</span>
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-full origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      {permissions.map((opt) => (
                        <Menu.Item key={opt.id}>
                          <div
                            className="flex gap-4 p-2 hover:bg-primary-100 hover:cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <span>{opt.name}</span>
                          </div>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex gap-3 items-center">
                  <input type="checkbox" id="checkbox1" />
                  <label htmlFor="checkbox1">Approve additions</label>
                </div>
                <div className="flex gap-3 items-center">
                  <input type="checkbox" id="checkbox2" />
                  <label htmlFor="checkbox2">Some other permission</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 h-[240px] overflow-y-auto flex flex-col gap-3">
          <h4>People with access</h4>
          <PermissionUserCard />
          <PermissionUserCard />
        </div>
        <div className="flex gap-4 justify-end mt-10">
          <button className="bg-primary-400 text-white px-10 py-3 rounded-sm disabled:opacity-75">
            Share
          </button>
        </div>
      </div>
    </>
  );
};

export const AddJournalTemp = () => {
  return (
    <>
      <div className="add-journal-modal flex gap-8 mt-8">
        <div className="w-80 bg-slate-50 flex justify-center items-center">
          <img src={dummyImg} />
        </div>
        <div className="grow">
          <div className="">
            <label htmlFor="" className="block mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full p-2 px-4 border border-slate-200"
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="" className="block mb-2">
              Caption
            </label>
            <textarea
              className="w-full p-2 px-4 border border-slate-200"
              rows={6}
            ></textarea>
          </div>
          <br />
          <div className="flex justify-end">
            <button className="bg-primary-400 text-white px-10 py-3 rounded-sm disabled:opacity-75">
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const ChangeBackgroundTemp = ({
  entityType,
  entityID,
  value,
}: TempPropType) => {
  const [bgColorSelected, setBgColorSelected] = useState<string | number>(
    value
  );
  const bgColorOptions = [
    "#FF0000",
    "#008000",
    "#0000FF",
    "#FFFFF0",
    "#808080",
    "#C0C0C0",
    "#FFFF00",
    "#800080",
  ];
  return (
    <>
      <div className="change-background flex gap-8 mt-8">
        <div className="all-colors flex gap-4">
          {bgColorOptions.map((color: string) => {
            return (
              <div
                className={cn(
                  "w-10 h-10",
                  bgColorSelected == color ? "border border-slate-500" : ""
                )}
                style={{ backgroundColor: color }}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};
