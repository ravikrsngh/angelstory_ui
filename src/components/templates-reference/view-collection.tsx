import { Menu, Tab, Transition } from "@headlessui/react";
import { IconDots, IconTextPlus, IconUserShare } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils";
import { Modal } from "../ui/modal";
import { ShareModalTemp } from "./all-modals";
import { Card } from "./template";

export default function ViewCollection() {
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [action, setAction] = useState<number>(0);
  const card_dropdown_options = [
    {
      id: 5,
      icon: <IconUserShare />,
      name: "Share",
      action: () => {
        setActionModal(true);
        setAction(5);
      },
    },
    {
      id: 7,
      icon: <IconTextPlus />,
      name: "Change Background",
      action: () => {
        setActionModal(true);
        setAction(7);
      },
    },
    {
      id: 8,
      icon: <IconTextPlus />,
      name: "Rename",
      action: () => {
        setActionModal(true);
        setAction(8);
      },
    },
  ];
  return (
    <div>
      <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-10">
        <div className="relative rounded-md  p-4 pt-10 pb-5 md:p-10 md:pt-[140px] lg:pt-[200px] bg-primary-200 text-primary-950">
          <span className="text-xs md:text-sm">Collection</span>
          <h4 className="text-3xl md:text-4xl lg:text-5xl font-medium">Ravi</h4>
          <div className="absolute top-4 right-4">
            <Menu as="div" className="relative inline-block text-left ml-auto">
              <div onClick={(e) => e.stopPropagation()}>
                <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-primary-700">
                  <IconDots
                    className="-mr-1 ml-2 h-5 w-5 text-primary-700"
                    aria-hidden="true"
                  />
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
                  <div className="px-1 py-1 ">
                    {card_dropdown_options.map((opt) => (
                      <Menu.Item key={opt.id}>
                        <div
                          className="flex gap-4 p-2 hover:bg-primary-100 hover:cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            opt.action();
                          }}
                        >
                          <span>{opt.icon}</span>
                          <span>{opt.name}</span>
                        </div>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <div className="lg:mt-10">
          <h4 className="font-medium mb-5 md:mb-10 text-xl flex justify-between items-center">
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
                          "px-3 md:px-10 py-3 font-medium",
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
                          "px-3 md:px-10 py-3 font-medium",
                          selected
                            ? "text-primary-400 border-b-2 border-primary-400"
                            : ""
                        )}
                      >
                        Videos
                      </button>
                    )}
                  </Tab>
                  <Tab>
                    {({ selected }) => (
                      <button
                        className={cn(
                          "px-3 md:px-10 py-3 font-medium",
                          selected
                            ? "text-primary-400 border-b-2 border-primary-400"
                            : ""
                        )}
                      >
                        Audios
                      </button>
                    )}
                  </Tab>
                  <Tab>
                    {({ selected }) => (
                      <button
                        className={cn(
                          "px-3 md:px-10 py-3 font-medium",
                          selected
                            ? "text-primary-400 border-b-2 border-primary-400"
                            : ""
                        )}
                      >
                        Needs Approval
                      </button>
                    )}
                  </Tab>
                  <Link
                    className="ml-auto text-xs md:text-sm lg:text-base"
                    to=""
                  >
                    View all assets
                  </Link>
                </div>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="flex gap-4 overflow-auto">
                    <Card
                      type="image"
                      name="image.png"
                      needs_approval={false}
                    />
                    <Card
                      type="image"
                      name="image.png"
                      needs_approval={false}
                    />
                    <Card
                      type="image"
                      name="image.png"
                      needs_approval={false}
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="flex gap-4 overflow-auto">
                    <Card
                      type="video"
                      name="video1.mp4"
                      needs_approval={false}
                    />
                    <Card
                      type="video"
                      name="video2.mp4"
                      needs_approval={false}
                    />
                    <Card
                      type="video"
                      name="video3.mp4"
                      needs_approval={false}
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="flex gap-4 overflow-auto">
                    <Card
                      type="music"
                      name="music1.mp3"
                      needs_approval={false}
                    />
                    <Card
                      type="music"
                      name="music2.mp3"
                      needs_approval={false}
                    />
                    <Card
                      type="music"
                      name="music3.mp3"
                      needs_approval={false}
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="flex gap-4 overflow-auto">
                    <Card type="image" name="image.png" needs_approval={true} />
                    <Card
                      type="music"
                      name="music2.mp3"
                      needs_approval={true}
                    />
                    <Card
                      type="video"
                      name="video3.mp4"
                      needs_approval={true}
                    />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
            Journies
          </h4>
          <div className="flex gap-4">
            <Card type="folder" name="journey" needs_approval={false} />
            <Card type="folder" name="journey 1" needs_approval={false} />
          </div>
        </div>
      </div>
      {action == 5 ? (
        <Modal
          headerLabel="Share Modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ShareModalTemp />
        </Modal>
      ) : null}
      {action == 7 ? (
        <Modal
          headerLabel="Change background modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ShareModalTemp />
        </Modal>
      ) : null}
    </div>
  );
}
