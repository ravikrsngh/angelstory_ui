import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { cn } from "../utils";
import * as HoverCard from "@radix-ui/react-hover-card";
import { CollectionProjects } from "../components/collection/collection-projects";

const CollectionAssets = () => {
  return (
    <div className="mt-10">
        <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
          Assets
        </h4>
        <div>
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
                <Link className="ml-auto" to="/collection/assets">
                  View all assets
                </Link>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex gap-4">
                  <div>
                    <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                      <HoverCard.Root>
                        <HoverCard.Trigger className="flex gap-1 absolute top-3 right-3">
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                          <HoverCard.Content
                            sideOffset={10}
                            className="w-20 -mr-3"
                          >
                            <div className="w-full">
                              <button className="w-full bg-white text-sm py-1 relative right-3">
                                Delete
                              </button>
                            </div>
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>
                    </div>
                  </div>
                  <div>
                    <div className="w-52 h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                      <HoverCard.Root>
                        <HoverCard.Trigger className="flex gap-1 absolute top-3 right-3">
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                          <HoverCard.Content
                            sideOffset={10}
                            className="w-20 -mr-3"
                          >
                            <div className="w-full">
                              <button className="w-full bg-white text-sm py-1 relative right-3">
                                Delete
                              </button>
                            </div>
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>
                    </div>
                  </div>
                </div>
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
  )
}



export default function Collection() {
  return (
    <div className="px-16 py-8 flex flex-col gap-10">
      <div className="relative rounded-md overflow-hidden p-10 pt-[200px] bg-primary-200 text-primary-950">
        <span className="text-sm">Collection</span>
        <h4 className="text-5xl font-medium">Ravi</h4>
      </div>
      <CollectionAssets />
      <CollectionProjects />
    </div>
  );
}
