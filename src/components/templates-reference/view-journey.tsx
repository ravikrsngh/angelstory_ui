import { Tab } from "@headlessui/react";
import { IconShare } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils";
import { Modal } from "../ui/modal";
import { ShareModalTemp } from "./all-modals";
import { Card } from "./template";

export default function ViewJourney() {
  const [shareModalDisplay, setShareModalDisplay] = useState<boolean>(false);
  return (
    <div>
      <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-10">
        <div className="relative rounded-md overflow-hidden p-4 pt-10 pb-5 md:p-10 md:pt-[140px] lg:pt-[200px] bg-primary-200 text-primary-950">
          <span className="text-xs md:text-sm">Journey</span>
          <h4 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            Ravi Journey 1
          </h4>
          <div className="absolute top-4 right-4">
            <button onClick={() => setShareModalDisplay(true)}>
              <IconShare />
            </button>
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
            Memories
          </h4>
          <div className="flex gap-4 overflow-auto">
            <Card type="image" name="image.png" needs_approval={false} />
            <Card type="music" name="music2.mp3" needs_approval={false} />
            <Card type="video" name="video3.mp4" needs_approval={false} />
          </div>
        </div>
      </div>
      {shareModalDisplay ? (
        <Modal
          headerLabel="Share Modal"
          openModal={shareModalDisplay}
          setOpenModal={setShareModalDisplay}
        >
          <ShareModalTemp />
        </Modal>
      ) : null}
    </div>
  );
}
