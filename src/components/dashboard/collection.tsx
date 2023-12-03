import { Dialog, Tab, Transition } from "@headlessui/react";
import { IconPlus } from "@tabler/icons-react";
import { cn } from "../../utils";
import { useState, Fragment } from "react";
import { Input } from "../ui/input";
import Cookies from "js-cookie";
import { useGetAllCollectionForUser } from "../../hooks/collection/use-get-collection";
import { useCreateCollection } from "../../hooks/collection/use-create-collection";
import { CollectionType } from "../../types";
import { CollectionCard } from "./collection-card";

export const DashboardCollection = () => {
  
    const {data, isLoading, isFetching, isError} = useGetAllCollectionForUser(Cookies.get('user') || '')
    const createCollectionHook = useCreateCollection()

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmitCreateCollection = (e) => {
    e.preventDefault();
    console.log(e.target.collection.value)
    createCollectionHook.mutate({collectionName: e.target.collection.value})
  }

  if(isLoading || isFetching) {
    return (
        <>
            <div>
                <span>Loading...</span>
            </div>
        </>
    )
  }

  if(isError) {
    return (
        <>
            <div>
                <span>Something went wrong !!</span>
            </div>
        </>
    )
  }

  return (
    <>
      <div>
        <h4 className="text-base font-medium mb-4 md:mb-10 md:text-xl flex justify-between items-center">
          My Collection
          <div
                    onClick={openModal}
                    className="flex hover:text-primary-400 cursor-pointer border-primary-200 text-primary-300 rounded-md md:hidden justify-center items-center gap-2"
                  >
                    <IconPlus size={18} />
                    <span>Create</span>
                  </div>
        </h4>
        <div>
          <Tab.Group>
            <Tab.List>
              <div className="flex gap-4 border-b border-slate-300 items-center mb-6 md:mb-8">
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "text-xs md:text-base px-5 md:px-10 py-3 font-medium",
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
                        "text-xs md:text-base px-5 md:px-10 py-3 font-medium",
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
                        "text-xs md:text-base px-5 md:px-10 py-3 font-medium",
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
                <div className="flex gap-4 overflow-auto">
                  <div
                    onClick={openModal}
                    className="hidden w-52 h-52 border-2 hover:border-primary-400 hover:text-primary-400 cursor-pointer border-primary-200 text-primary-300 rounded-md md:flex flex-col justify-center items-center gap-2"
                  >
                    <IconPlus />
                    <span>Create</span>
                  </div>
                  {data.map((cc:CollectionType) => <CollectionCard key={cc.id} id={cc.id} name={cc.name} bgColor={cc.bgColor} /> )}
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
                  <form action="" className="my-10" onSubmit={handleSubmitCreateCollection}>
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
};
