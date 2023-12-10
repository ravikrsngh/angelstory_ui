import { Transition, Dialog } from "@headlessui/react";
import EditBorder from "../../edit-panel/components/border";
import EditFill from "../../edit-panel/components/fill";
import EditShadow from "../../edit-panel/components/shadow";
import { MobileEditPanelPropType } from "../../../types";

export const MobileEditPanel = ({
  object,
  tabClicked,
  displayMobileEditPanel,
  setDisplayMobileEditPanel,
}:MobileEditPanelPropType) => {
  return (
    <>
      <Transition appear show={displayMobileEditPanel}>
        <Dialog
          as="div"
          className="fixed left-0 bottom-16 z-10 w-full shadow-[0_-2px_8px_rgba(0,0,0,0.1)] overflow-y-auto max-h-[220px]"
          onClose={() => setDisplayMobileEditPanel(false)}
        >
          <div className="flex relative items-center justify-center text-center">
            <Dialog.Panel className=" py-8 w-full max-w-3xl transform overflow-hidden rounded-md bg-white text-left align-middle transition-all">
              <div
              className="px-5">
                {tabClicked == 1 ? <EditBorder object={object} /> : null}
                {tabClicked == 2 ? <EditFill object={object} /> : null}
                {tabClicked == 3 ? <EditShadow object={object} /> : null}
              </div>
              
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
