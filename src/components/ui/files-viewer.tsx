import {
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconX,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EntityType, MemoryTypes } from "../../types";
import { getHeaderIcon } from "../../utils";

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
  const [editJournalMode, setEditJournalMode] = useState<boolean>(false);
  console.log(props);

  const moveNext = () => {
    let nextIdx = null;
    for (let i = 0; i < props.items.length; i++) {
      const element = props.items[i];
      if (element.id == activeFile?.id) {
        nextIdx = i == props.items.length - 1 ? 0 : i + 1;
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
                  className="hover:cursor-pointer hover:text-slate-300"
                  onClick={() => setEditJournalMode(true)}
                >
                  <IconEdit />
                </div>
              )}
              {[MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(
                activeFile.type
              ) && (
                <div className="hover:cursor-pointer hover:text-slate-300">
                  <Link
                    to={`/design/${props.collectionId}/${props.journeyId}/${activeFile.id}`}
                  >
                    Open in editor
                  </Link>
                </div>
              )}
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
                {activeFile.type == MemoryTypes.IMAGE && (
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
                    <form>
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
                        defaultValue={activeFile.description}
                      />
                      <button
                        type="button"
                        onClick={() => setEditJournalMode(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit">Save</button>
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
        </div>
      )}
    </div>
  );
};
