import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import UploadToolPanel from "../../../pages/design/upload-tool";
import { IconX } from "@tabler/icons-react";
import BackgroundPanel from "../../../pages/design/background-panel";
import ShapesPanel from "../../../pages/design/shapes-panel";
import TextPanel from "../../../pages/design/text";
import { TemplatePanel } from "../../../pages/design/templates-panel";

export const FullScreenDialog = ({mobileFullDisplay, setMobileFullDisplay, tab}) => {
  return (
    <Transition appear show={mobileFullDisplay} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => setMobileFullDisplay(false)}
      >
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
          <div className="flex relative min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="absolute top-0 left-0 h-full py-8 w-full max-w-3xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center px-5 mb-4">
                  <h3 className="text-lg">
                  {
                  tab == 1? "Upload/Choose Images" : null
                }
                {
                  tab == 2? "Choose Background" : null
                }
                {
                  tab == 3? "Choose Shapes" : null
                }
                {
                  tab == 4? "Add Text" : null
                }
                {
                  tab == 5? "Choose Template" : null
                }
                  </h3>
                  <button onClick={() => setMobileFullDisplay(false)}><IconX /></button>
                </div>
                {
                  tab == 1? <UploadToolPanel /> : null
                }
                {
                  tab == 2? <BackgroundPanel /> : null
                }
                {
                  tab == 3? <ShapesPanel /> : null
                }
                {
                  tab == 4? <TextPanel /> : null
                }
                {
                  tab == 5? <TemplatePanel /> : null
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
