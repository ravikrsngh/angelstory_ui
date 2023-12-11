import { Tab } from "@headlessui/react";
import { cn } from "../utils";
import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { IconX } from "@tabler/icons-react";

export default function CollectionAssets() {
  const [itemsSelected, setItemsSelected] = useState<number[]>([]);
  const itemChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setItemsSelected((prev) => {
        let newarr = [...prev]
        newarr.push(parseInt(e.target.value))
        return newarr
      })
    } else {
      setItemsSelected((prev) => {
        let newarr = prev.filter((itemId) => itemId !== parseInt(e.target.value))
        return newarr
      })
    }
  };
  console.log(itemsSelected)
  return (
    <div className="px-4 md:px-10 lg:px-16 py-16">
      <h2 className="font-medium text-xl md:text-2xl lg:text-3xl">Collection Name/ Assets</h2>
      <div className="mt-10">
        <Tab.Group>
          <Tab.List>
            <div className="flex justify-center md:justify-start gap-4 border-b border-slate-300 items-center mb-8">
              <Tab>
                {({ selected }) => (
                  <button
                    className={cn(
                      "px-10 py-3 font-medium outline-none",
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
                      "px-10 py-3 font-medium outline-none",
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
            {itemsSelected.length > 0 && (
              <div className="bg-primary-200 px-6 py-2 flex gap-3 mb-6 rounded-md">
                <span>{itemsSelected.length} selected</span>
                <button>
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  className=" ml-auto"
                  onClick={() => setItemsSelected([])}
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>
            )}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <form className="grid grid-cols-2 md:flex flex-wrap gap-4">
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={10}
                      checked={itemsSelected.includes(10)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={11}
                      checked={itemsSelected.includes(11)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={12}
                      checked={itemsSelected.includes(12)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52  relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={13}
                      checked={itemsSelected.includes(13)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={14}
                      checked={itemsSelected.includes(14)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={15}
                      checked={itemsSelected.includes(15)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={16}
                      checked={itemsSelected.includes(16)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={17}
                      checked={itemsSelected.includes(17)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={18}
                      checked={itemsSelected.includes(18)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={19}
                      checked={itemsSelected.includes(19)}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                    <input
                      type="checkbox"
                      className="absolute top-3 right-3"
                      onChange={itemChecked}
                      value={20}
                      checked={itemsSelected.includes(20)}
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
