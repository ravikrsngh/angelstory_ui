import { Menu, Transition } from "@headlessui/react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDots,
  IconDownload,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSaveProject } from "../../hooks/project/use-save-project";
import { AccessTypeGroups, EntityType, MemoryTypes } from "../../types";
import { cn, getHeaderIcon } from "../../utils";
import { ViewerDeleteModal } from "./all-modals";
import { DropdownButton } from "./dropdown-action-buttons";
import { Modal } from "./modal";

export type FilesViewerItemType = {
  type: string;
  src: string;
  name: string;
  title?: string;
  description?: string;
  entityType: string;
  id: number;
  collectionId: number | null;
  journeyId: number | null;
  accessRight?: string | null;
};

type FilesViewerProp = {
  items: FilesViewerItemType[];
  setView: Dispatch<SetStateAction<boolean>>;
  activeId: number;
  collectionId: number | null;
  journeyId: number | null;
  publicView?: boolean;
};

export const FilesViewer = (props: FilesViewerProp) => {
  const [activeFile, setActiveFile] = useState<FilesViewerItemType | null>(
    null
  );
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [editJournalMode, setEditJournalMode] = useState<boolean>(false);
  const saveProjectHook = useSaveProject();
  const navigate = useNavigate();
  console.log(props);

  const addJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    saveProjectHook.mutate(
      {
        projectId: activeFile?.id,
        title: formData.get("title") as string,
        caption: formData.get("description") as string,
      },
      {
        onSuccess: () => {
          setEditJournalMode(false);
        },
      }
    );
  };

  const moveNext = () => {
    let nextIdx = null;
    for (let i = 0; i < props.items.length; i++) {
      const element = props.items[i];
      if (element.id == activeFile?.id) {
        nextIdx = i == props.items.length - 1 ? 0 : i + 1;
        setEditJournalMode(false);
        setActiveFile(props.items[nextIdx]);
        return;
      }
    }
  };

  const moveBack = () => {
    let nextIdx = null;
    for (let i = 0; i < props.items.length; i++) {
      const element = props.items[i];
      if (element.id == activeFile?.id) {
        nextIdx = i == 0 ? props.items.length - 1 : i - 1;
        setEditJournalMode(false);
        setActiveFile(props.items[nextIdx]);
        return;
      }
    }
  };

  const downloadBtnClicked = (name: string, src: string) => {
    if ([MemoryTypes.CARD].includes(activeFile?.type || "")) {
      name = `${activeFile?.name}.jpg`;
    } else if ([MemoryTypes.VIDEO].includes(activeFile?.type || "")) {
      name = `${activeFile?.name}.mp4`;
    }
    const link = document.createElement("a");
    link.href = src;
    link.download = name;
    link.click();
  };

  useEffect(() => {
    for (let i = 0; i < props.items.length; i++) {
      const element = props.items[i];
      if (element.id == props.activeId) {
        setActiveFile(element);
        return;
      }
    }
  }, []);

  console.log(activeFile);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/75 z-[99]">
      {activeFile ? (
        <div className="h-full">
          <div className="file-view-header py-2 px-4 flex items-center">
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="text-primary-400">
                {getHeaderIcon(activeFile.type)}
              </div>
              <span className="text-slate-200 overflow-hidden whitespace-nowrap  text-ellipsis">
                {activeFile.name}
              </span>
            </div>
            {props.publicView ||
            [...AccessTypeGroups.OWNER, ...AccessTypeGroups.EDIT].includes(
              activeFile.accessRight || ""
            ) ? (
              <>
                <div className="lg:hidden ml-auto flex gap-4 items-center">
                  <Menu
                    as="div"
                    className="relative inline-block text-left ml-auto"
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-primary-700">
                        <IconDots
                          className="-mr-1 ml-2 h-5 w-5 text-white"
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
                      <Menu.Items
                        className={cn(
                          "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                        )}
                      >
                        <div
                          className="px-1 py-1 "
                          onClick={(e) => e.stopPropagation()}
                        >
                          {activeFile.entityType == EntityType.MEMORY && (
                            <Menu.Item key="add-journal">
                              <DropdownButton
                                icon={""}
                                name={"Add/Edit Journal"}
                                onClickHandler={() => setEditJournalMode(true)}
                              />
                            </Menu.Item>
                          )}
                          {[MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(
                            activeFile.type
                          ) && (
                            <Menu.Item key="open-editor">
                              <DropdownButton
                                icon={""}
                                name={"Open in editor"}
                                onClickHandler={() =>
                                  navigate(
                                    `/design/${activeFile.collectionId}/${activeFile.journeyId}/${activeFile.id}`
                                  )
                                }
                              />
                            </Menu.Item>
                          )}
                          {activeFile.type == MemoryTypes.IMAGE && (
                            <Menu.Item key="convert-product">
                              <DropdownButton
                                icon={""}
                                name={"Convert to Product"}
                                onClickHandler={() => {}}
                              />
                            </Menu.Item>
                          )}
                          {[
                            MemoryTypes.AUDIO,
                            MemoryTypes.CARD,
                            MemoryTypes.IMAGE,
                            MemoryTypes.PDF,
                            MemoryTypes.SLIDESHOW,
                            MemoryTypes.VIDEO,
                          ].includes(activeFile.type) && (
                            <Menu.Item key="download">
                              <DropdownButton
                                icon={""}
                                name={"Download"}
                                onClickHandler={() =>
                                  downloadBtnClicked(
                                    activeFile.name,
                                    activeFile.src
                                  )
                                }
                              />
                            </Menu.Item>
                          )}
                          <Menu.Item key="delete">
                            <DropdownButton
                              icon={""}
                              name={"Delete"}
                              onClickHandler={() => setActionModal(true)}
                            />
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <div
                    className="text-white hover:cursor-pointer hover:text-slate-300"
                    onClick={() => props.setView(false)}
                  >
                    <IconX />
                  </div>
                </div>
                <div className="hidden lg:flex ml-auto text-slate-400 items-center gap-4">
                  {activeFile.entityType == EntityType.MEMORY && (
                    <div
                      className="hover:cursor-pointer hover:text-slate-300 text-xs"
                      onClick={() => setEditJournalMode(true)}
                    >
                      Add/Edit Journal
                    </div>
                  )}
                  {[MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(
                    activeFile.type
                  ) && (
                    <div className="hover:cursor-pointer hover:text-slate-300 text-xs">
                      <Link
                        to={`/design/${activeFile.collectionId}/${activeFile.journeyId}/${activeFile.id}`}
                      >
                        Open in editor
                      </Link>
                    </div>
                  )}
                  {activeFile.type == MemoryTypes.IMAGE && (
                    <div
                      className="hover:cursor-pointer hover:text-slate-300 text-xs"
                      onClick={() => setEditJournalMode(true)}
                    >
                      Convert to Product
                    </div>
                  )}
                  {[
                    MemoryTypes.AUDIO,
                    MemoryTypes.CARD,
                    MemoryTypes.IMAGE,
                    MemoryTypes.PDF,
                    MemoryTypes.SLIDESHOW,
                    MemoryTypes.VIDEO,
                  ].includes(activeFile.type) && (
                    <div
                      className="hover:cursor-pointer hover:text-slate-300 text-xs"
                      onClick={() =>
                        downloadBtnClicked(activeFile.name, activeFile.src)
                      }
                    >
                      <IconDownload />
                    </div>
                  )}
                  <div
                    className="hover:cursor-pointer hover:text-slate-300"
                    onClick={() => setActionModal(true)}
                  >
                    <IconTrash />
                  </div>
                  <div
                    className="hover:cursor-pointer hover:text-slate-300"
                    onClick={() => props.setView(false)}
                  >
                    <IconX />
                  </div>
                </div>
              </>
            ) : (
              <div className="ml-auto text-slate-400  flex items-center gap-4">
                <div
                  className="hover:cursor-pointer hover:text-slate-300"
                  onClick={() => props.setView(false)}
                >
                  <IconX />
                </div>
              </div>
            )}
          </div>
          <div className="file-view-main w-full py-4 px-16 lg:px-20 flex justify-center items-center h-[calc(100vh-40px)] overflow-hidden">
            <div className="w-full grid grid-cols-[auto,auto] overflow-hidden justify-center items-center">
              <div className="view grow max-w-[1121px]">
                {[MemoryTypes.IMAGE, MemoryTypes.CARD].includes(
                  activeFile.type
                ) && (
                  <div>
                    <img src={activeFile.src} className="w-full" />
                  </div>
                )}
                {[MemoryTypes.AUDIO].includes(activeFile.type) && (
                  <div>
                    <audio controls>
                      <source src={activeFile.src} />
                    </audio>
                  </div>
                )}
                {[MemoryTypes.PDF].includes(activeFile.type) && (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-white">{activeFile.name}</p>
                    <a
                      target="_blank"
                      className="px-4 py-2 bg-primary-400 text-white"
                      href={activeFile.src}
                    >
                      Open
                    </a>
                  </div>
                )}
                {[MemoryTypes.VIDEO, MemoryTypes.SLIDESHOW].includes(
                  activeFile.type
                ) && (
                  <div>
                    <video
                      src={activeFile.src}
                      controls
                      playsInline
                      className="w-full"
                    ></video>
                  </div>
                )}
                {activeFile.entityType == EntityType.COLLECTION && (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-white">{activeFile.name}</p>
                    <Link
                      className="px-4 py-2 bg-primary-400 text-white"
                      to={`collection/${activeFile.id}`}
                    >
                      Open
                    </Link>
                  </div>
                )}
                {activeFile.entityType == EntityType.JOURNEY && (
                  <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-white">{activeFile.name}</p>
                    <Link
                      className="px-4 py-2 bg-primary-400 text-white"
                      to={`journey/${activeFile.id}`}
                    >
                      Open
                    </Link>
                  </div>
                )}
              </div>
              {(activeFile.description ||
                activeFile.title ||
                editJournalMode) && (
                <div className="journal w-80 p-6 bg-slate-50 h-full">
                  {editJournalMode ? (
                    <form onSubmit={addJournal}>
                      <textarea
                        placeholder="Title"
                        className="text-sm bg-transparent outline-none w-full"
                        name="title"
                        defaultValue={activeFile.title}
                      />
                      <textarea
                        placeholder="Description"
                        className="text-sm bg-transparent outline-none w-full"
                        name="description"
                        rows={7}
                        defaultValue={activeFile.description}
                      />
                      <div className="flex gap-4 justify-end mt-4">
                        <button
                          type="button"
                          className="text-xs"
                          onClick={() => setEditJournalMode(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-primary-400 text-white text-xs py-2 px-5"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <h3 className="text-sm">{activeFile.title}</h3>
                      <p className="text=xs">{activeFile.description}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="right-nav absolute top-20 right-0 w-14 lg:w-20 h-full pb-40 flex justify-center items-center">
            <button
              className="lg:w-10 lg:h-10 rounded-full lg:bg-slate-500 flex justify-center items-center hover:bg-slate-300"
              onClick={moveNext}
            >
              <IconChevronRight />
            </button>
          </div>
          <div className="right-nav absolute top-20 pb-40 left-0 w-14 lg:w-20 h-full flex justify-center items-center">
            <button
              className="lg:w-10 lg:h-10 rounded-full lg:bg-slate-500 flex justify-center items-center hover:bg-slate-300"
              onClick={moveBack}
            >
              <IconChevronLeft />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-white">
          <span>No files selected</span>
          <button className="text-xs" onClick={() => props.setView(false)}>
            Close
          </button>
        </div>
      )}
      <Modal
        headerLabel="Delete Item"
        openModal={actionModal}
        setOpenModal={setActionModal}
      >
        <ViewerDeleteModal
          entityType={activeFile?.entityType || ""}
          entityId={activeFile?.id || -1}
        />
      </Modal>
    </div>
  );
};
