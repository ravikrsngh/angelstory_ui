import { Disclosure } from "@headlessui/react";
import {
  IconChevronDown,
  IconChevronUp,
  IconFolderFilled,
} from "@tabler/icons-react";
import { Fragment } from "react";
import { cn } from "../../utils";

export default function ViewAllTemplate() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen pt-20 flex gap-10">
      <div className="w-80 border-l border-slate-300 h-full py-8 shadow-md">
        <h4 className="text-lg mb-4 px-5">Collection</h4>
        <Disclosure as={Fragment}>
          {({ open }) => (
            <>
              <Disclosure.Button className={cn("outline-none w-full")}>
                <div className="flex gap-3 items-center text-left px-5 py-2 hover:bg-primary-50">
                  <div className="flex gap-2 items-center text-sm ">
                    <IconFolderFilled size={20} />
                    Collection 1
                  </div>
                  {open ? (
                    <IconChevronUp className="ml-auto" />
                  ) : (
                    <IconChevronDown className="ml-auto" />
                  )}
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="py-2">
                  <div className="px-9 flex gap-2 items-center text-sm py-2 hover:bg-primary-50">
                    <IconFolderFilled size={20} />
                    Journey 1
                  </div>
                  <div className="px-9 flex gap-2 items-center text-sm py-2 hover:bg-primary-50">
                    <IconFolderFilled size={20} />
                    Journey 1
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as={Fragment}>
          {({ open }) => (
            <>
              <Disclosure.Button className={cn("outline-none w-full")}>
                <div className="flex gap-3 items-center text-left px-5 py-2 hover:bg-primary-50">
                  <div className="flex gap-2 items-center text-sm ">
                    <IconFolderFilled size={20} />
                    Collection 2
                  </div>
                  {open ? (
                    <IconChevronUp className="ml-auto" />
                  ) : (
                    <IconChevronDown className="ml-auto" />
                  )}
                </div>
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="py-2">
                  <div className="px-9 flex gap-2 items-center text-sm py-2 hover:bg-primary-50">
                    <IconFolderFilled size={20} />
                    Journey 1
                  </div>
                  <div className="px-9 flex gap-2 items-center text-sm py-2 hover:bg-primary-50">
                    <IconFolderFilled size={20} />
                    Journey 1
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
