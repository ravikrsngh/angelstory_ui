import { Transition, Dialog } from "@headlessui/react";
import SlideshowPanel from "../../../pages/design/slideshow-panel";

export const MobileSlideShowPanel = () => {
    return (
        <>
          <Transition appear show={true}>
            <div className="fixed left-0 bottom-16 z-10 w-full shadow-[0_-2px_8px_rgba(0,0,0,0.1)] overflow-y-auto">
              <div className="flex relative items-center justify-center text-center">
                <SlideshowPanel />
              </div>
            </div>
          </Transition>
        </>
      );
}