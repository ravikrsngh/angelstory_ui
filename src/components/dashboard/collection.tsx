import { Dialog, Transition } from "@headlessui/react";
import { IconPlus } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCollection } from "../../hooks/collection/use-create-collection";
import { useGetAllCollectionForUser } from "../../hooks/collection/use-get-collection";
import { AssetTypes, CollectionType, EntityType } from "../../types";
import { NewCard } from "../ui/cards";
import { CollectionDropdownList } from "../ui/dropdown-action-buttons";
import { Input } from "../ui/input";

export const DashboardCollection = () => {
  const { data, isLoading, isFetching, isError } = useGetAllCollectionForUser(
    Cookies.get("user") || ""
  );

  const navigate = useNavigate();
  const createCollectionHook = useCreateCollection();

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmitCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    createCollectionHook.mutate({
      collectionName: formData.get("collection") as string,
    });
    setIsOpen(false);
  };

  if (isLoading || isFetching) {
    return (
      <>
        <div>
          <span>Loading...</span>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div>
          <span>Something went wrong !!</span>
        </div>
      </>
    );
  }

  console.log(data);

  return (
    <>
      <div>
        <h4 className="text-base font-medium mb-6 md:text-lg flex justify-between items-center">
          My Collection
          <div
            onClick={openModal}
            className="flex hover:text-primary-400 cursor-pointer border-primary-200 text-primary-300 rounded-md justify-center items-center gap-2"
          >
            <IconPlus size={18} />
            <span>Create</span>
          </div>
        </h4>
        <div className="overflow-x-auto overflow-y-visible">
          <div className="flex gap-4">
            {/* <div
              key={0}
              onClick={openModal}
              className="hidden w-52 h-[308px] border-2 hover:border-primary-400 hover:text-primary-400 cursor-pointer border-primary-200 text-primary-300 rounded-md md:flex flex-col justify-center items-center gap-2"
            >
              <IconPlus />
              <span>Create</span>
            </div> */}
            {data.map((cc: CollectionType) => (
              <NewCard
                key={cc.entityId}
                type={AssetTypes.FOLDER}
                name={cc.name}
                dropdownOptions={CollectionDropdownList}
                onClickHandler={() => navigate(`/collection/${cc.entityId}`)}
                entityId={cc.entityId}
                entityType={EntityType.COLLECTION}
                bgImage={cc.bgImage}
                accessRight={cc.accessRight}
              />
            ))}
          </div>
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
                    className="text-lg md:text-xl text-center font-medium leading-6 text-gray-900"
                  >
                    Create Collection
                  </Dialog.Title>
                  <form
                    action=""
                    className="my-10"
                    onSubmit={handleSubmitCreateCollection}
                  >
                    <Input label="Collection Name" name="collection" />
                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
