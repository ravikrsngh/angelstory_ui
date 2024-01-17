import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { Input } from "../../ui/input";
import { AddMusicModalPropType } from "../../../types";

export default function AddMusicModal({
  addMusicModal,
  setAddMusicModal,
}: AddMusicModalPropType) {
  function closeModal() {
    setAddMusicModal(false);
  }
  return (
    <>
      <Transition appear show={addMusicModal} as={Fragment}>
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
                    as="div"
                    className="flex justify-between items-center"
                  >
                    <h3 className="text-xl font-medium leading-6 text-gray-900">
                      Add Music
                    </h3>
                    <button className="text-center text-sm inline-block bg-primary-400 text-white py-2 px-5 w-fit">
                      + Add Music
                    </button>
                  </Dialog.Title>
                  <form action="" className="my-10">
                    <Input label="Collection Name" name="collection" />
                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
    </>
  );
}
