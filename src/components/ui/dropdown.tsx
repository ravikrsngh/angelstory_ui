import { IconChevronDown } from "@tabler/icons-react";
import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from "react";

export const Dropdown = ({options}:) => {
    return (
      <Menu as="div">
        <Menu.Button>
          <div className="w-full">
            <div className="w-full flex justify-between items-center border border-slate-300 p-2">
              <span>Times New Roman</span>
              <IconChevronDown size={20} />
            </div>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-primary-300"}`}
                  href="/account-settings"
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
}