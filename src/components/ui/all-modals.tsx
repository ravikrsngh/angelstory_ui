import { IconArrowLeft } from "@tabler/icons-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDeleteAssets } from "../../hooks/assets/use-delete-assets";
import { useDeleteCollection } from "../../hooks/collection/use-delete-collection";
import { useUpdateCollection } from "../../hooks/collection/use-update-collection";
import { useCreateJourney } from "../../hooks/journey/use-create-journey";
import { useDeleteJourney } from "../../hooks/journey/use-delete-journey";
import { useMoveJourney } from "../../hooks/journey/use-move-journey";
import { useUpdateJourney } from "../../hooks/journey/use-update-journey";
import { useCreateProject } from "../../hooks/project/use-create-project";
import { useDeleteProject } from "../../hooks/project/use-delete-project";
import { useMoveProjects } from "../../hooks/project/use-move-projects";
import { useSaveProject } from "../../hooks/project/use-save-project";
import {
  AssetResType,
  CollectionType,
  DataObjectType,
  EntityType,
  JourneyType,
  MemoryType,
  MemoryTypes,
  MoveCopyModalPropType,
  ProjectDimensionType,
  StageLists,
} from "../../types";
import { cn } from "../../utils";
import { Input } from "./input";
import SelectCardSize from "./select-card-size";
import SelectFolder from "./select-folder";
import UploadArea from "./upload-area";
import ViewUploadModalContent from "./view-uploads-modal";

export const CollectionRenameModal = ({
  dataObject,
  setActionModal,
}: {
  dataObject: DataObjectType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const updateCollectionHook = useUpdateCollection();
  const handleSubmitRenameCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    if (dataObject) {
      updateCollectionHook.mutate({
        collectionId: dataObject.entityId,
        bgColor: dataObject.bgColor,
        collectionName: formData.get("collection") as string,
      });
    }
    setActionModal(false);
  };
  return (
    <>
      <form action="" className="my-10" onSubmit={handleSubmitRenameCollection}>
        <Input
          label="Collection Name"
          name="collection"
          defaultValue={dataObject?.name}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Rename
          </button>
        </div>
      </form>
    </>
  );
};

export const ChangeBackgroundCollection = ({
  entityType,
  dataObject,
  setActionModal,
}: {
  entityType: string;
  dataObject: DataObjectType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [bgColorSelected, setBgColorSelected] = useState<string | undefined>(
    dataObject?.bgColor?.length == 6 ? dataObject.bgColor : "#FEF8F1"
  );
  const updateCollectionHook = useUpdateCollection();
  const updateJourneyHook = useUpdateJourney();
  const bgColorOptions = [
    "#CEB8AF",
    "#FEF8F1",
    "#FF0000",
    "#008000",
    "#0000FF",
    "#FFFFF0",
    "#808080",
    "#C0C0C0",
    "#FFFF00",
    "#800080",
  ];

  console.log(entityType);

  const changeBackgroundColor = () => {
    if (dataObject) {
      if (entityType == EntityType.COLLECTION) {
        updateCollectionHook.mutate({
          collectionId: (dataObject as CollectionType).entityId,
          bgColor: bgColorSelected,
        });
      } else if (entityType == EntityType.JOURNEY) {
        updateJourneyHook.mutate({
          journeyId: (dataObject as JourneyType).id,
          bgColor: bgColorSelected,
        });
      }
    }
    setActionModal(false);
  };

  return (
    <>
      <div className="change-background flex gap-8 mt-8 flex-col">
        <div className="all-colors flex gap-4">
          {bgColorOptions.map((color: string) => {
            return (
              <div
                className={cn(
                  "w-10 h-10",
                  bgColorSelected == color ? "border-2 border-slate-500" : ""
                )}
                onClick={() => setBgColorSelected(color)}
                style={{ backgroundColor: color }}
              ></div>
            );
          })}
        </div>
        <div className=" flex justify-end">
          <button
            type="button"
            onClick={changeBackgroundColor}
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Change
          </button>
        </div>
      </div>
    </>
  );
};

export const DeleteModal = ({
  entityType,
  dataObject,
  setActionModal,
}: {
  entityType: string;
  dataObject: DataObjectType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const deleteCollectionHook = useDeleteCollection();
  const deleteJourneyHook = useDeleteJourney();
  const deleteAssetHook = useDeleteAssets();
  const deleteMemoryHook = useDeleteProject();

  const deleteHandler = async () => {
    if (dataObject) {
      if (entityType == EntityType.COLLECTION) {
        deleteCollectionHook.mutate((dataObject as CollectionType).entityId);
      } else if (entityType == EntityType.ASSET) {
        deleteAssetHook.mutate([(dataObject as AssetResType).id]);
      } else if (entityType == EntityType.JOURNEY) {
        deleteJourneyHook.mutate([(dataObject as JourneyType).id]);
      } else if (entityType == EntityType.MEMORY) {
        deleteMemoryHook.mutate((dataObject as MemoryType).id);
      }
    }
    setActionModal(false);
  };
  return (
    <>
      <div className="delete-modal">
        <span className="block mt-4">
          Are you sure you want to delete {dataObject?.name} ?
        </span>
        <div className="flex gap-4 justify-end mt-10">
          <button
            className="bg-red-900 text-white px-10 py-3 rounded-sm"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export const AddJourneyModal = ({
  dataObject,
  setActionModal,
}: {
  dataObject: DataObjectType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const createJourneyHook = useCreateJourney();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    if (dataObject) {
      createJourneyHook.mutate({
        collectionId: (dataObject as CollectionType).entityId,
        journeyName: formData.get("journey") as string,
      });
    }
    setActionModal(false);
  };
  return (
    <div className="add-journey-modal">
      <form action="" className="my-10" onSubmit={submitHandler}>
        <Input label="Journey Name" name="journey" />
        <div className="flex gap-4 justify-end mt-10">
          <button
            type="submit"
            className="bg-primary-400 text-white px-10 py-3 rounded-sm"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export const JourneyRenameModal = ({
  dataObject,
  setActionModal,
}: {
  dataObject: JourneyType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const updateJourneyHook = useUpdateJourney();
  const handleSubmitRenameJourney = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    if (dataObject) {
      updateJourneyHook.mutate({
        journeyId: dataObject.id,
        bgColor: dataObject.bgColor,
        journeyName: formData.get("journey") as string,
      });
    }
    setActionModal(false);
  };
  return (
    <>
      <form action="" className="my-10" onSubmit={handleSubmitRenameJourney}>
        <Input
          label="Journey Name"
          name="journey"
          defaultValue={dataObject.name}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Rename
          </button>
        </div>
      </form>
    </>
  );
};

export const AddMemoryModal = ({
  collectionId,
  journeyId,
}: {
  collectionId: number;
  journeyId: number;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [memoryType, setMemoryType] = useState<string>("");
  const [projectDimension, setProjectDimension] =
    useState<ProjectDimensionType | null>(null);
  const [stage, setStage] = useState<number>(StageLists.UPLOAD_SELECT);
  const [toCollectionId, setToCollectionId] = useState<number>(collectionId);
  const [toJourneyId, setToJourneyId] = useState<number>(journeyId);

  const createProjectHook = useCreateProject();

  const createProject = (name: string) => {
    const payload = {
      caption: "",
      collectionId: toCollectionId,
      formattedData: "",
      height: projectDimension?.height || 0,
      journeyId: toJourneyId,
      name: name,
      previewImage: "",
      projectType: memoryType,
      title: "",
      width: projectDimension?.width || 0,
    };
    createProjectHook.mutate(payload);
    console.log(payload);
  };

  const createProjectOrMoveToNext = () => {
    if (files.length == 0 && memoryType == "") {
      return;
    } else if (
      ([MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(memoryType) &&
        toCollectionId == -1) ||
      toJourneyId == -1
    ) {
      setStage(StageLists.CARD_SIZE);
    } else if (toCollectionId != -1 && toJourneyId != -1) {
      createProject("Untitled");
    } else {
      setStage(StageLists.SELECT_FOLDER);
    }
  };

  useEffect(() => {
    createProjectOrMoveToNext();
  }, [projectDimension]);

  console.log(stage);

  return (
    <>
      <div className="add-memory-modal">
        {stage == StageLists.UPLOAD_SELECT ? (
          <>
            <h3 className="text-xl">Create Memory</h3>
            <div className="flex justify-between items-center h-[300px] mt-6">
              <UploadArea
                setFiles={setFiles}
                nextBtnHandler={() => setStage(StageLists.VIEW_UPLOADS)}
              />
              <div className="flex p-6">
                <span>OR</span>
              </div>
              <div className="h-full flex flex-col gap-4">
                <div
                  className="w-[200px] bg-primary-200 rounded-md flex-grow flex justify-center items-center"
                  onClick={() => {
                    setMemoryType(MemoryTypes.CARD);
                    setStage(StageLists.CARD_SIZE);
                  }}
                >
                  <span>CARD</span>
                </div>
                <div
                  className="w-[200px] bg-primary-200 rounded-md flex-grow flex justify-center items-center"
                  onClick={() => {
                    setMemoryType(MemoryTypes.SLIDESHOW);
                    setStage(StageLists.CARD_SIZE);
                  }}
                >
                  <span>SLIDESHOW</span>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {stage == StageLists.VIEW_UPLOADS ? (
          <>
            <h3 className="text-xl">Selected Files</h3>
            <ViewUploadModalContent
              files={files}
              setFiles={setFiles}
              nextBtnHandler={() => setStage(StageLists.SELECT_FOLDER)}
              backBtnHandler={() => {
                setFiles([]);
                setStage(StageLists.UPLOAD_SELECT);
              }}
              nextBtnLabel={
                toCollectionId == -1 && toJourneyId == -1
                  ? "Choose folder"
                  : "Create Memory"
              }
            />
          </>
        ) : null}
        {stage == StageLists.SELECT_FOLDER ? (
          <>
            <h3 className="text-xl">Where to save this memory ?</h3>
            <SelectFolder
              toCollectionId={toCollectionId}
              toJourneyId={toJourneyId}
              setToCollectionId={setToCollectionId}
              setToJourneyId={setToJourneyId}
              nextBtnHandler={() => setStage(StageLists.SELECT_FOLDER)}
              backBtnHandler={() => {
                setStage(StageLists.VIEW_UPLOADS);
                setToCollectionId(-1);
                setToJourneyId(-1);
              }}
              nextBtnLabel="Upload Here"
            />
          </>
        ) : null}
        {stage == StageLists.CARD_SIZE ? (
          <>
            <h3 className="text-xl flex gap-4 items-center">
              <button onClick={() => setStage(StageLists.UPLOAD_SELECT)}>
                <IconArrowLeft />
              </button>{" "}
              <span>Select Card Size</span>
            </h3>
            <SelectCardSize
              setProjectDimension={setProjectDimension}
              nextBtnHandler={() => {}}
              backBtnHandler={() => {
                setStage(StageLists.VIEW_UPLOADS);
                setToCollectionId(-1);
                setToJourneyId(-1);
              }}
              nextBtnLabel="Upload Here"
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export const AddJournalModal = ({
  dataObject,
  setActionModal,
}: {
  dataObject: MemoryType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const saveProjectHook = useSaveProject();
  const handleSubmitAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    if (dataObject) {
      saveProjectHook.mutate({
        ...dataObject,
        projectId: dataObject.id,
        title: formData.get("title") as string,
        caption: formData.get("caption") as string,
      });
    }
    setActionModal(false);
  };
  return (
    <>
      <div className="add-journal-modal flex gap-8 mt-8">
        <div className="w-80 bg-slate-50 flex justify-center items-center">
          <img src={dataObject.previewImage} />
        </div>
        <form className="grow" onSubmit={handleSubmitAddJournal}>
          <div className="">
            <label htmlFor="" className="block mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full p-2 px-4 border border-slate-200"
              name="title"
              defaultValue={dataObject.title}
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="" className="block mb-2">
              Caption
            </label>
            <textarea
              className="w-full p-2 px-4 border border-slate-200"
              rows={6}
              name="caption"
              defaultValue={dataObject.caption}
            ></textarea>
          </div>
          <br />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary-400 text-white px-10 py-3 rounded-sm disabled:opacity-75"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const MemoryRenameModal = ({
  dataObject,
  setActionModal,
}: {
  dataObject: MemoryType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const saveProjectHook = useSaveProject();
  const handleSubmitRenameJourney = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    if (dataObject) {
      saveProjectHook.mutate({
        ...dataObject,
        projectId: dataObject.id,
        name: formData.get("journey") as string,
      });
    }
    setActionModal(false);
  };
  return (
    <>
      <form action="" className="my-10" onSubmit={handleSubmitRenameJourney}>
        <Input
          label="Memory Name"
          name="journey"
          defaultValue={dataObject.name}
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Rename
          </button>
        </div>
      </form>
    </>
  );
};

export const MoveCopyModal = ({
  mode,
  entityType,
  dataObject,
  setActionModal,
}: MoveCopyModalPropType) => {
  const [toCollectionId, setToCollectionId] = useState<number>(-1);
  const [toJourneyId, setToJourneyId] = useState<number>(-1);
  const moveJourneyHook = useMoveJourney();
  const moveProjectHook = useMoveProjects();
  const moveOrCopy = () => {
    if (entityType == EntityType.JOURNEY) {
      if (toCollectionId == -1) {
        toast.error("Please select a valid location");
        return;
      }
      moveJourneyHook.mutate({
        mode: mode,
        collectionId: toCollectionId,
        journeyId: [(dataObject as JourneyType).id],
      });
    } else if (entityType == EntityType.MEMORY) {
      if (toCollectionId == -1 || toJourneyId == -1) {
        toast.error("Please select a valid location.");
        return;
      }
      moveProjectHook.mutate({
        mode: mode,
        collectionId: toCollectionId,
        journeyId: toJourneyId,
        projectId: [(dataObject as MemoryType).id],
      });
    }
    setActionModal(false);
  };
  return (
    <>
      <SelectFolder
        toCollectionId={toCollectionId}
        toJourneyId={toJourneyId}
        setToCollectionId={setToCollectionId}
        setToJourneyId={setToJourneyId}
        nextBtnHandler={moveOrCopy}
        backBtnHandler={() => {
          setToCollectionId(-1);
          setToJourneyId(-1);
        }}
        showJourney={entityType == EntityType.JOURNEY ? false : true}
        nextBtnLabel={`${mode} here`}
      />
    </>
  );
};
