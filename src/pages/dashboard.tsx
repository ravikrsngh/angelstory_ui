import { IconPlus, IconSearch } from "@tabler/icons-react";
import dashboard_hero_img from "./../assets/dashboard_hero.svg";
import template_img from "./../assets/templates_card.svg";
import MultiCarousel from "../components/multi-carousel";
import { Link } from "react-router-dom";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { cn } from "../utils";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Fragment, useState } from "react";
import { Input } from "../components/ui/input";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="px-16 py-8 flex flex-col gap-10">
      <div>
        <form
          action=""
          className="flex border-[1px] border-slate-400 bg-white rounded-sm"
        >
          <input
            type="text"
            placeholder="Search templates"
            className="grow px-4 py-3"
          />
          <button className="px-4 py-3">
            <IconSearch />
          </button>
        </form>
      </div>
      <div className="relative rounded-md overflow-hidden max-h-96">
        <img src={dashboard_hero_img} alt="" className="w-full" />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <button className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500">
            <IconPlus /> <span className="font-medium">New Project</span>
          </button>
        </div>
      </div>
      <div className="mt-10">
        <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
          Select Templates{" "}
          <Link to="/templates" className="text-base hover:underline">
            View All
          </Link>
        </h4>
        <div>
          <MultiCarousel itemClass="mx-3 !w-56">
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
            <div className="relative w-56">
              <img src={template_img} alt="" className="w-full" />
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
                <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
                  Use This template
                </button>
              </div>
            </div>
          </MultiCarousel>
        </div>
      </div>
      <div className="mt-10">
        <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
          My Collection
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
                      Recent
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
                      Yours
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
                      Shared with you
                    </button>
                  )}
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex gap-4">
                  <div
                    onClick={openModal}
                    className="w-52 h-52 border-2 hover:border-primary-400 hover:text-primary-400 cursor-pointer border-primary-200 text-primary-300 rounded-md flex flex-col justify-center items-center gap-2"
                  >
                    <IconPlus />
                    <span>Create</span>
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
                    <span className="block text-center py-2">Ravi</span>
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
                    <span className="block text-center py-2">Sabrina</span>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <p>Fetch all Collection</p>
              </Tab.Panel>
              <Tab.Panel>
                <p>Shared with you </p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="py-10 px-5 w-full max-w-3xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-center font-medium leading-6 text-gray-900"
                  >
                    Create Collection
                  </Dialog.Title>
                  <form action="" className="my-10">
                    <Input label="Collection Name" />
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
