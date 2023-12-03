import { Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";

export const Dropdown = ({trigger, options}) => {
    return (
      <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button>
          {trigger}
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-2 py-2 ">
            {options.map((opt) => 
            <Menu.Item>
              {opt}
            </Menu.Item>)}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    );
}