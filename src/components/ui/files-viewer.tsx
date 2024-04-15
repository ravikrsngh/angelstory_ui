import {
  IconChevronLeft,
  IconChevronRight,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSaveProject } from "../../hooks/project/use-save-project";
import { EntityType, MemoryTypes } from "../../types";
import { getHeaderIcon } from "../../utils";
import { ViewerDeleteModal } from "./all-modals";
import { Modal } from "./modal";

export type FilesViewerItemType = {
  type: string;
  src: string;
  name: string;
  title?: string;
  description?: string;
  entityType: string;
  id: number;
};

type FilesViewerProp = {
  items: FilesViewerItemType[];
  setView: Dispatch<SetStateAction<boolean>>;
  activeId: number;
  collectionId: number | null;
  journeyId: number | null;
};

export const FilesViewer = (props: FilesViewerProp) => {
  const [activeFile, setActiveFile] = useState<FilesViewerItemType | null>(
    null
  );
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [editJournalMode, setEditJournalMode] = useState<boolean>(false);
  const saveProjectHook = useSaveProject();
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

  useEffect(() => {
    for (let i = 0; i < props.items.length; i++) {
      const element = props.items[i];
      if (element.id == props.activeId) {
        setActiveFile(element);
        return;
      }
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/75 z-[99]">
      {activeFile ? (
        <div className="h-full">
          <div className="file-view-header py-2 px-4 flex items-center">
            <div className="flex items-center gap-4">
              <div className="text-primary-400">
                {getHeaderIcon(activeFile.type)}
              </div>
              <span className="text-slate-200">{activeFile.name}</span>
            </div>
            <div className="ml-auto text-slate-400  flex items-center gap-4">
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
                    to={`/design/${props.collectionId}/${props.journeyId}/${activeFile.id}`}
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
          </div>
          <div className="w-full overflow-hidden py-4 px-20 flex justify-center">
            <div className="bg-slate-50 w-fit flex justify-center">
              <div className="view grow max-w-[1121px]">
                {[MemoryTypes.IMAGE, MemoryTypes.CARD].includes(
                  activeFile.type
                ) && (
                  <div>
                    <img src={activeFile.src} className="w-full" />
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
          <div className="right-nav absolute top-20 right-0 w-20 h-full pb-40 flex justify-center items-center">
            <button
              className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center hover:bg-slate-300"
              onClick={moveNext}
            >
              <IconChevronRight />
            </button>
          </div>
          <div className="right-nav absolute top-20 pb-40 left-0 w-20 h-full flex justify-center items-center">
            <button
              className="w-10 h-10 rounded-full bg-slate-500 flex justify-center items-center hover:bg-slate-300"
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
