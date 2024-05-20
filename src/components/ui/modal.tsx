import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import { FC, Fragment } from "react";
import { ModalPropsType } from "../../types";

export const Modal: FC<ModalPropsType> = ({
  children,
  onClose,
  openModal,
  setOpenModal,
  headerLabel,
}) => {
  const closeModal = () => {
    setOpenModal(false);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog as="div" className="relative z-999" onClose={() => closeModal()}>
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

        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-25 z-[999]">
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
              <Dialog.Panel className="py-6 md:py-10 px-4 md:px-10 w-full max-w-3xl transform !overflow-auto rounded-md max-h bg-white text-left shadow-xl transition-all max-h-[calc(100vh-40px)]">
                <div className="modal relative">
                  {headerLabel != "" && (
                    <h3 className="text-lg lg:text-xl">{headerLabel}</h3>
                  )}
                  {children}
                  <div className="actions">
                    <button
                      className="absolute top-0 right-0"
                      onClick={closeModal}
                    >
                      <IconX />
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
