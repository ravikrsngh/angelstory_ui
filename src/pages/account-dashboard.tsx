import { Tab } from "@headlessui/react";
import {
  ClipboardDocumentIcon,
  LockClosedIcon,
  NewspaperIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import AccountSetting from "../components/account-dashboard/account-setting";
import ChangePassword from "../components/account-dashboard/change-password";
import SideNavProfile from "../components/account-dashboard/sidenav-profile";
import YourTemplates from "../components/account-dashboard/your-templates";
import { cn } from "../utils";

import { Dropdown } from "../components/ui/dropdown";

const navigation = [
  {
    name: "Account Setting",
    value: 0,
    icon: UsersIcon,
  },
  {
    name: "Login and Security",
    value: 1,
    icon: LockClosedIcon,
  },
  {
    name: "Your Templates",
    value: 2,
    icon: NewspaperIcon,
  },
  {
    name: "Purchase History",
    value: 3,
    icon: ClipboardDocumentIcon,
  },
];

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lindsay.walton@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];

export default function Example() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:top-20 lg:h-full lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-16 ">
            <nav className="flex flex-1 flex-col">
              <SideNavProfile />
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <Tab.List>
                    <ul role="list" className="-mx-2 space-y-3">
                      {navigation.map((item) => (
                        <li key={item.value}>
                          <Tab className="w-full outline-none">
                            <span
                              className={cn(
                                item.value == selectedIndex
                                  ? "bg-primary-400 text-white"
                                  : "text-black hover:text-white hover:bg-primary-300",
                                "group flex gap-x-3 rounded-sm p-3 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  item.value == selectedIndex
                                    ? "text-white"
                                    : "text-black group-hover:text-white",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </span>
                          </Tab>
                        </li>
                      ))}
                    </ul>
                  </Tab.List>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-80">
          <main className="py-6 lg:py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="border border-slate-200 flex items-center gap-10 lg:hidden py-2 px-4 justify-between mb-10 bg-primary-400">
                <h2 className="text-lg font-medium text-white">
                  {(selectedIndex == 0 && "Account Setting") ||
                    (selectedIndex == 1 && "Login and Security") ||
                    (selectedIndex == 2 && "Your Templates") ||
                    (selectedIndex == 3 && "Purchase History")}
                </h2>
                <Dropdown
                  trigger={
                    <button className="text-white">
                      <IconChevronDown />
                    </button>
                  }
                  options={navigation.map((ins) => {
                    return (
                      <span
                        className="w-full text-base font-normal block p-2 hover:bg-primary-50"
                        onClick={() => setSelectedIndex(ins.value)}
                      >
                        {ins.name}
                      </span>
                    );
                  })}
                />
              </div>
              <Tab.Panels>
                <Tab.Panel>
                  <AccountSetting />
                </Tab.Panel>
                <Tab.Panel>
                  <ChangePassword />
                </Tab.Panel>
                <Tab.Panel>
                  <YourTemplates />
                </Tab.Panel>
                <Tab.Panel>
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                              >
                                Description
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Total
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {people.map((person) => (
                              <tr key={person.email}>
                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                  <div className="flex items-center">
                                    <div className="h-11 w-11 flex-shrink-0">
                                      <img
                                        className="h-11 w-11 rounded-full"
                                        src={person.image}
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">
                                        Subscription Plan Name
                                      </div>
                                      <div className="mt-1 text-gray-500">
                                        Valid Till : -12th Oct
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  <div className="text-gray-900">
                                    1st Sept, 2023
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    Active
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  $100
                                </td>
                                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Print
                                    <span className="sr-only">
                                      , {person.name}
                                    </span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </main>
        </div>
      </Tab.Group>
    </div>
  );
}
