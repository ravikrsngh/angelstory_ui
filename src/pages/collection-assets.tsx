import { Tab } from "@headlessui/react";
import { cn } from "../utils";
import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { IconX } from "@tabler/icons-react";

export default function CollectionAssets() {
  const [itemsSelected, setItemsSelected] = useState<number>(0);
  const itemChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setItemsSelected((prev) => prev + 1);
    } else {
      setItemsSelected((prev) => prev - 1);
    }
  };
  return (
    <div className="px-16 py-16">
      <h2 className="font-medium text-3xl">Collection Name/ Assets</h2>
      <div className="mt-10">
        <Tab.Group>
          <Tab.List>
            <div className="flex gap-4 border-b border-slate-300 items-center mb-8">
              <Tab>
                {({ selected }) => (
                  <button
                    className={cn(
                      "px-10 py-3 font-medium",
                      selected
                        ? "text-primary-400 border-b-2 border-primary-400"
                        : ""
                    )}
                  >
                    Images
                  </button>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <button
                    className={cn(
                      "px-10 py-3 font-medium",
                      selected
                        ? "text-primary-400 border-b-2 border-primary-400"
                        : ""
                    )}
                  >
                    Audio
                  </button>
                )}
              </Tab>
            </div>
            {itemsSelected > 0 && (
              <div className="bg-primary-200 px-6 py-2 flex gap-3 mb-6 rounded-md">
                <span>{itemsSelected} selected</span>
                <button>
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  className=" ml-auto"
                  onClick={() => setItemsSelected(0)}
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>
            )}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <form className="flex flex-wrap gap-4">
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                    />
                  </div>
                </div>
              </form>
            </Tab.Panel>
            <Tab.Panel>
              <p>Fetch all audio in similar fashion</p>
            </Tab.Panel>
            <Tab.Panel>
              <p>Shared with you </p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
