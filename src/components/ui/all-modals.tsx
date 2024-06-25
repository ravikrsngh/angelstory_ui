import { Disclosure, Menu, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  IconArrowLeft,
  IconChevronDown,
  IconChevronUp,
  IconTrash,
} from "@tabler/icons-react";
import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { useAddUserPermission } from "../../hooks/access-rights/use-add-user";
import { useGetAllAccessRightForEntity } from "../../hooks/access-rights/use-get-all-access";
import { useGetAllUserAccessForEntity } from "../../hooks/access-rights/use-get-all-access-for-entity";
import { useGetPublicLink } from "../../hooks/access-rights/use-get-public-link";
import { useDeleteUserPermission } from "../../hooks/access-rights/use-remove-access";
import { useUpdateUserPermission } from "../../hooks/access-rights/use-update-user-access";
import {
  createBulkAssetType,
  useBulkCreateAssets,
} from "../../hooks/assets/use-bulk-upload";
import { useDeleteAssets } from "../../hooks/assets/use-delete-assets";
import { useGetImagesForEntity } from "../../hooks/assets/use-get-images-for-entity";
import {
  moveAssetType,
  useMoveAssets,
} from "../../hooks/assets/use-move-asses";
import { useDeleteCollection } from "../../hooks/collection/use-delete-collection";
import { useUpdateCollection } from "../../hooks/collection/use-update-collection";
import { useCreateJourney } from "../../hooks/journey/use-create-journey";
import { useDeleteJourney } from "../../hooks/journey/use-delete-journey";
import { useMoveJourney } from "../../hooks/journey/use-move-journey";
import { useUpdateJourney } from "../../hooks/journey/use-update-journey";
import { useBulkDeleteProjects } from "../../hooks/project/use-bulk-delete-projects";
import { useCreateProject } from "../../hooks/project/use-create-project";
import { useDeleteProject } from "../../hooks/project/use-delete-project";
import { useMoveProjects } from "../../hooks/project/use-move-projects";
import { useSaveProject } from "../../hooks/project/use-save-project";
import { uploadFiles } from "../../service/aws";
import {
  EntityType,
  FileTypeMap,
  MemoryTypes,
  MoveCopyModalPropType,
  PermissionType,
  PermissionUserCardPropType,
  ProjectDimensionType,
  SourceMemory,
  StageLists,
  UserSearchResType,
} from "../../types";
import { cn } from "../../utils";
import ColorPallete from "../edit-panel/components/color-pallete";
import { Input } from "./input";
import { Loader } from "./loaders";
import SelectCardSize from "./select-card-size";
import SelectFolder from "./select-folder";
import { UserSearchComp } from "./share-modal-comp";
import UploadArea from "./upload-area";
import ViewUploadModalContent from "./view-uploads-modal";

type BaseModalPropType = {
  entityType: string;
  entityId: number;
  name: string;
  bgImage: string;
  accessRight: string;
  bulkIds?: number[];
  setActionModal: Dispatch<SetStateAction<boolean>>;
  afterAction?: () => void;
};

export const CollectionRenameModal = ({
  entityId,
  name,
  setActionModal,
}: BaseModalPropType) => {
  const updateCollectionHook = useUpdateCollection();
  const handleSubmitRenameCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    updateCollectionHook.mutate(
      {
        collectionId: entityId,
        collectionName: formData.get("collection") as string,
      },
      {
        onSuccess: () => {
          setActionModal(false);
        },
      }
    );
  };
  return (
    <>
      <form action="" className="my-10" onSubmit={handleSubmitRenameCollection}>
        <Input label="Collection Name" name="collection" defaultValue={name} />
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
  entityId,
  setActionModal,
}: {
  entityType: string;
  entityId: number;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const changeBackgroundStages = {
    COLORS: 1,
    SEE_PREVIEW_IMAGE: 2,
    CHOOSE_FROM_ANGELJOURNEY: 3,
  };
  const changeBackgroundSources = {
    COLORS: 1,
    FILE: 2,
    ANGELJOURNEY: 3,
  };
  const [stage, setStage] = useState<number>(changeBackgroundStages.COLORS);
  const [source, setSource] = useState(changeBackgroundSources.COLORS);
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [bgColorSelected, setBgColorSelected] = useState<string | null>(null);
  const [bgImageSelected, setBgImageSelected] = useState<string | null>(null);
  const [displayColorPallete, setDisplayColorPallete] =
    useState<boolean>(false);
  const updateCollectionHook = useUpdateCollection();
  const updateJourneyHook = useUpdateJourney();
  const getImagesForEntityHook = useGetImagesForEntity(entityId, entityType);
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

  const imageInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      // if (selectedFile) {
      //   const reader = new FileReader();

      //   reader.onload = function (event) {
      //     const dataURL = event.target?.result;
      //     setBgImageSelected(dataURL);
      //   };

      //   reader.readAsDataURL(file);
      // }
      setBgImageSelected(URL.createObjectURL(selectedFile));
      setInputFile(selectedFile);
      setSource(changeBackgroundSources.FILE);
      setStage(changeBackgroundStages.SEE_PREVIEW_IMAGE);
    }
  };

  const changeBackgroundColor = async () => {
    if (!bgColorSelected && !bgImageSelected) {
      toast.error("Please select a background color or a background image.");
      return;
    }
    const payload: { bgColor?: string; bgImage?: string } = {
      bgColor: "",
      bgImage: "",
    };
    if (source == changeBackgroundSources.COLORS) {
      payload.bgColor = bgColorSelected || "";
    } else if (source == changeBackgroundSources.FILE) {
      const urlLists = await uploadFiles([inputFile]);
      payload.bgImage = urlLists[0].url;
    } else if (source == changeBackgroundSources.ANGELJOURNEY) {
      payload.bgImage = bgImageSelected || "";
    }
    if (entityType == EntityType.COLLECTION) {
      updateCollectionHook.mutate({
        collectionId: entityId,
        ...payload,
      });
    } else if (entityType == EntityType.JOURNEY) {
      updateJourneyHook.mutate({
        journeyId: entityId,
        ...payload,
      });
    }
    setActionModal(false);
  };

  const reset = () => {
    setStage(changeBackgroundStages.COLORS);
    setSource(changeBackgroundSources.COLORS);
    setInputFile(null);
    setBgImageSelected(null);
  };

  return (
    <>
      <div className="change-background flex gap-8 mt-8 flex-col overflow-auto max-h-full">
        {stage == changeBackgroundStages.COLORS && (
          <div className="flex flex-col  lg:flex-row gap-6">
            <div className="all-colors">
              <div className="flex gap-4 flex-wrap">
                {bgColorOptions.map((color: string) => {
                  return (
                    <div
                      className={cn(
                        "w-10 h-10 border border-slate-200",
                        bgColorSelected == color
                          ? "border-slate-500 border-2"
                          : ""
                      )}
                      onClick={() => setBgColorSelected(color)}
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
              <div className="text-center mt-5">OR</div>
              {displayColorPallete ? (
                <div>
                  <ColorPallete
                    color={bgColorSelected || "#CEB8AF"}
                    onChange={setBgColorSelected}
                    displayColorPallete={setDisplayColorPallete}
                  />
                </div>
              ) : (
                <span
                  className="block text-center my-5 cursor-pointer"
                  onClick={() => setDisplayColorPallete(true)}
                >
                  Choose from color wheel
                </span>
              )}
            </div>
            <div className="px-4 flex justify-center items-center">
              <span>OR </span>
            </div>
            <div className="choose-image-section w-full lg:w-64">
              <div className="w-full h-24 bg-primary-200 flex justify-center items-center rounded-md">
                <input
                  type="file"
                  id="bg-image-input"
                  className="w-0 h-0 overflow-hidden"
                  onChange={imageInputChanged}
                />
                <label
                  htmlFor="bg-image-input"
                  className="flex justify-center items-center w-full h-full"
                >
                  Choose Image
                </label>
              </div>
              <button
                className="text-center block my-4 text-xs w-full"
                onClick={() =>
                  setStage(changeBackgroundStages.CHOOSE_FROM_ANGELJOURNEY)
                }
              >
                Choose from AngelJourney
              </button>

              <span className="text-xs">
                Note :- Recommended size for images : 1152 X 312px
              </span>
            </div>
          </div>
        )}
        {stage == changeBackgroundStages.CHOOSE_FROM_ANGELJOURNEY && (
          <div className="flex flex-wrap gap-4">
            {getImagesForEntityHook.data?.map((url: string) => (
              <div
                className="w-16 h-20 bg-slate-300 bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
                onClick={() => {
                  setBgImageSelected(url);
                  setSource(changeBackgroundSources.ANGELJOURNEY);
                  setStage(changeBackgroundStages.SEE_PREVIEW_IMAGE);
                }}
              ></div>
            ))}
          </div>
        )}
        {stage == changeBackgroundStages.SEE_PREVIEW_IMAGE && (
          <div className="">
            <div
              className="w-full h-52 rounded-md bg-gradient-to-b from-transparent to-black bg-cover bg-center"
              style={{
                backgroundImage: `url('${bgImageSelected}')`,
                backgroundBlendMode: "overlay",
              }}
            ></div>
          </div>
        )}

        <div className=" flex justify-end">
          {stage != changeBackgroundStages.COLORS ? (
            <button className="px-4 py-2" onClick={reset}>
              Cancel
            </button>
          ) : null}
          <button
            type="button"
            onClick={changeBackgroundColor}
            className={cn(
              "text-center inline-flex justify-center rounded-md border border-transparent bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
              stage == changeBackgroundStages.COLORS ? "w-full" : ""
            )}
          >
            Change
          </button>
        </div>
      </div>
    </>
  );
};

export const DeleteModal = ({
  entityId,
  entityType,
  name,
  bulkIds,
  afterAction,
  setActionModal,
}: BaseModalPropType) => {
  const deleteCollectionHook = useDeleteCollection();
  const deleteJourneyHook = useDeleteJourney();
  const deleteAssetHook = useDeleteAssets();
  const deleteMemoryHook = useDeleteProject();
  const bulkDeleteMemoriesHook = useBulkDeleteProjects();

  console.log(afterAction);

  const afterSuccess = () => {
    setActionModal(false);
    if (afterAction) {
      afterAction();
    }
  };

  const deleteHandler = async () => {
    console.log(bulkIds);
    if (bulkIds && bulkIds.length > 0) {
      if (entityType == EntityType.ASSET) {
        deleteAssetHook.mutate(bulkIds, { onSuccess: afterSuccess });
      } else if (entityType == EntityType.JOURNEY) {
        deleteJourneyHook.mutate(bulkIds, { onSuccess: afterSuccess });
      } else if (entityType == EntityType.MEMORY) {
        bulkDeleteMemoriesHook.mutate(bulkIds, { onSuccess: afterSuccess });
      }
    } else {
      if (entityType == EntityType.COLLECTION) {
        deleteCollectionHook.mutate(entityId, { onSuccess: afterSuccess });
      } else if (entityType == EntityType.ASSET) {
        deleteAssetHook.mutate([entityId], { onSuccess: afterSuccess });
      } else if (entityType == EntityType.JOURNEY) {
        deleteJourneyHook.mutate([entityId], { onSuccess: afterSuccess });
      } else if (entityType == EntityType.MEMORY) {
        deleteMemoryHook.mutate(entityId, { onSuccess: afterSuccess });
      }
    }
  };
  return (
    <>
      <div className="delete-modal">
        <span className="block mt-4">
          Are you sure you want to delete {name} ?
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
  entityId,
  setActionModal,
}: BaseModalPropType) => {
  const createJourneyHook = useCreateJourney();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    createJourneyHook.mutate({
      collectionId: entityId,
      journeyName: formData.get("journey") as string,
    });
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
  entityId,
  name,
  setActionModal,
}: BaseModalPropType) => {
  const updateJourneyHook = useUpdateJourney();
  const handleSubmitRenameJourney = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    updateJourneyHook.mutate({
      journeyId: entityId,
      journeyName: formData.get("journey") as string,
    });
    setActionModal(false);
  };
  return (
    <>
      <form action="" className="my-10" onSubmit={handleSubmitRenameJourney}>
        <Input label="Journey Name" name="journey" defaultValue={name} />
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

export const AddMemoryUploadModal = ({
  collectionId,
  journeyId,
  source,
  setActionModal,
}: {
  source: string;
  collectionId: number;
  journeyId: number;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [apiLoading, setApiLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [memoryType, setMemoryType] = useState<string>("");
  const [projectDimension, setProjectDimension] =
    useState<ProjectDimensionType | null>(null);
  const [stage, setStage] = useState<number>(StageLists.UPLOAD_SELECT);
  const [toCollectionId, setToCollectionId] = useState<number>(collectionId);
  const [toJourneyId, setToJourneyId] = useState<number>(journeyId);
  const [saveAsMemory, setSaveAsMemory] = useState<boolean>(true);

  const createProjectHook = useCreateProject();
  const bullUploadHook = useBulkCreateAssets();

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
  };

  const afterSelectingCardSize = () => {
    if (files.length == 0 && memoryType == "") {
      return;
    } else if (
      [MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(memoryType) &&
      !projectDimension
    ) {
      setStage(StageLists.CARD_SIZE);
    } else if (
      toCollectionId != -1 &&
      toJourneyId != -1 &&
      [MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(memoryType) &&
      projectDimension
    ) {
      createProject("Untitled");
    } else {
      setStage(StageLists.SELECT_FOLDER);
    }
  };

  const bulkUpload = async () => {
    setApiLoading(true);
    const urlLists = await uploadFiles(files);
    console.log(urlLists);
    const payload: createBulkAssetType = {
      assetList: urlLists.map((url) => {
        return {
          assetType: FileTypeMap[url.file.name.split(".")[1]],
          assetUrl: url.url,
          name: url.file.name,
        };
      }),
      collectionId: toCollectionId,
      memory: saveAsMemory,
    };
    if (toJourneyId != -1) {
      payload.journeyId = toJourneyId;
    }
    bullUploadHook.mutate(payload, {
      onSuccess: () => setApiLoading(false),
      onError: () => setApiLoading(false),
    });
  };

  const afterSelectingFolders = async () => {
    // Validate Selection
    if (
      ([SourceMemory.MEMORY, SourceMemory.MEMORY_DASHBOARD].includes(source) ||
        saveAsMemory) &&
      (toCollectionId == -1 || toJourneyId == -1)
    ) {
      toast.error("To save a memory you need to select a journey.");
      return;
    }
    if (
      source == SourceMemory.UPLOAD &&
      !saveAsMemory &&
      toCollectionId == -1
    ) {
      toast.error(
        "You need to select a valid location to save your uploaded files."
      );
      return;
    }

    //After all validations are passed, we call create project or move next.
    if (files.length == 0) {
      afterSelectingCardSize();
    } else {
      await bulkUpload();
      setActionModal(false);
    }
  };

  const afterViewModal = async () => {
    if (files.length == 0) {
      toast.error("Please select some file.");
      return;
    }
    if (source == SourceMemory.MEMORY) {
      await bulkUpload();
      setActionModal(false);
    } else {
      setStage(StageLists.SELECT_FOLDER);
    }
  };

  useEffect(() => {
    afterSelectingCardSize();
  }, [projectDimension]);

  console.log(stage);

  return (
    <>
      <div className="add-memory-modal">
        {stage == StageLists.UPLOAD_SELECT ? (
          <>
            <h3 className="text-lg md:text-xl">
              {source == SourceMemory.UPLOAD ? "Upload files" : "Create Memory"}
            </h3>
            <div className="w-full flex flex-col md:flex-row justify-between items-center h-[300px] mt-6">
              <UploadArea
                setFiles={setFiles}
                nextBtnHandler={() => {
                  setMemoryType("UPLOAD_FILES");
                  setStage(StageLists.VIEW_UPLOADS);
                }}
              />
              {source == SourceMemory.UPLOAD ? null : (
                <>
                  <div className="flex p-6">
                    <span className="text-sm">OR</span>
                  </div>
                  <div className="w-full h-full flex flex-col gap-4">
                    <div
                      className="w-full bg-[#e39679] rounded-md flex-grow flex justify-center items-center text-white"
                      onClick={() => {
                        setMemoryType(MemoryTypes.CARD);
                        setStage(StageLists.CARD_SIZE);
                      }}
                    >
                      <span>CARD</span>
                    </div>
                    <div
                      className="w-full bg-[#e39679] rounded-md flex-grow flex justify-center items-center text-white"
                      onClick={() => {
                        setMemoryType(MemoryTypes.SLIDESHOW);
                        setStage(StageLists.CARD_SIZE);
                      }}
                    >
                      <span>SLIDESHOW</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : null}
        {stage == StageLists.VIEW_UPLOADS ? (
          <>
            <h3 className="text-xl">Selected Files</h3>
            {source == SourceMemory.UPLOAD && (
              <div className="my-2 flex gap-2 items-center">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  defaultChecked={saveAsMemory}
                  onChange={() => setSaveAsMemory((prev) => !prev)}
                />
                <span>Save as Memory</span>
              </div>
            )}
            <ViewUploadModalContent
              files={files}
              setFiles={setFiles}
              nextBtnHandler={afterViewModal}
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
            <h3 className="text-xl flex gap-4 items-center">
              <span>Choose Location</span>
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <button>
                    <QuestionMarkCircleIcon className="h-6 w-6 mt-1" />
                  </button>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content className="z-[9999]">
                    <p className="p-5 bg-primary-50 shadow-sm rounded-sm max-w-xs">
                      If you want to create a new location, go to dashborad and
                      start by creating a collection. You can then create
                      journies inside the collection.
                    </p>
                    <HoverCard.Arrow />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </h3>
            <SelectFolder
              toCollectionId={toCollectionId}
              toJourneyId={toJourneyId}
              setToCollectionId={setToCollectionId}
              setToJourneyId={setToJourneyId}
              nextBtnHandler={afterSelectingFolders}
              backBtnHandler={() => {
                setStage(StageLists.VIEW_UPLOADS);
                setToCollectionId(-1);
                setToJourneyId(-1);
              }}
              nextBtnLabel={
                [MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(memoryType)
                  ? "Create here"
                  : "Upload here"
              }
            />
          </>
        ) : null}
        {stage == StageLists.CARD_SIZE ? (
          <>
            <h3 className="text-xl flex gap-4 items-center">
              <button onClick={() => setStage(StageLists.UPLOAD_SELECT)}>
                <IconArrowLeft />
              </button>{" "}
              <span>Select Size</span>
            </h3>
            <SelectCardSize
              setProjectDimension={setProjectDimension}
              nextBtnHandler={() => {}}
              backBtnHandler={() => {
                setStage(StageLists.VIEW_UPLOADS);
                setToCollectionId(-1);
                setToJourneyId(-1);
              }}
              nextBtnLabel={
                [MemoryTypes.CARD, MemoryTypes.SLIDESHOW].includes(memoryType)
                  ? "Create here"
                  : "Upload here"
              }
            />
          </>
        ) : null}
        <Loader
          isLoading={apiLoading}
          position={"fixed"}
          label="Uploading files..."
        />
      </div>
    </>
  );
};

export const AddJournalModal = ({
  entityId,
  bgImage,
  title,
  caption,
  setActionModal,
}: BaseModalPropType & {
  title: string;
  caption: string;
}) => {
  const saveProjectHook = useSaveProject();
  const handleSubmitAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    saveProjectHook.mutate({
      projectId: entityId,
      title: formData.get("title") as string,
      caption: formData.get("caption") as string,
    });
    setActionModal(false);
  };
  return (
    <>
      <div className="add-journal-modal flex gap-8 mt-8">
        <div className="w-80 bg-slate-50 flex justify-center items-center">
          <img src={bgImage} />
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
              defaultValue={title}
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
              defaultValue={caption}
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
  entityId,
  name,
  setActionModal,
}: BaseModalPropType) => {
  const saveProjectHook = useSaveProject();
  const handleSubmitRenameJourney = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    saveProjectHook.mutate({
      projectId: entityId,
      name: formData.get("journey") as string,
    });
    setActionModal(false);
  };
  return (
    <>
      <form action="" className="my-10" onSubmit={handleSubmitRenameJourney}>
        <Input label="Memory Name" name="journey" defaultValue={name} />
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
  entityId,
  bulkIds,
  afterAction,
  setActionModal,
}: MoveCopyModalPropType) => {
  const [toCollectionId, setToCollectionId] = useState<number>(-1);
  const [toJourneyId, setToJourneyId] = useState<number>(-1);
  const moveJourneyHook = useMoveJourney();
  const moveProjectHook = useMoveProjects();
  const moveAssetHook = useMoveAssets();

  const afterSuccess = () => {
    setActionModal(false);
    toast.success(`Successfully performefd the action.`);
    if (afterAction) {
      afterAction();
    }
  };

  const moveOrCopy = () => {
    if (entityType == EntityType.JOURNEY) {
      if (toCollectionId == -1) {
        toast.error("Please select a valid location");
        return;
      }
      moveJourneyHook.mutate(
        {
          mode: mode,
          collectionId: toCollectionId,
          journeyId: bulkIds ? bulkIds : [entityId],
        },
        { onSuccess: afterSuccess }
      );
    } else if (entityType == EntityType.MEMORY) {
      if (toCollectionId == -1 || toJourneyId == -1) {
        toast.error("Please select a valid location.");
        return;
      }
      moveProjectHook.mutate(
        {
          mode: mode,
          collectionId: toCollectionId,
          journeyId: toJourneyId,
          projectIds: bulkIds ? bulkIds : [entityId],
        },
        { onSuccess: afterSuccess }
      );
    } else if (entityType == EntityType.ASSET) {
      if (toCollectionId == -1 && toJourneyId == -1) {
        toast.error("Please select a valid location.");
        return;
      }
      const payload: moveAssetType = {
        mode: mode,
        newCollectionId: toCollectionId,
        assetIds: bulkIds ? bulkIds : [entityId],
      };
      if (toJourneyId != -1) {
        payload.newJourneyId = toJourneyId;
      }
      moveAssetHook.mutate(payload, { onSuccess: afterSuccess });
    }
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

export const ShareModal = ({
  entityType,
  entityId,
  setActionModal,
}: BaseModalPropType) => {
  const [selecteduser, setSelectedUsers] = useState<UserSearchResType[]>([]);
  const { data } = useGetAllAccessRightForEntity(entityType);
  const [selectedPermission, setSelectedPermission] =
    useState<PermissionType | null>(null);
  const addUserPermissionHook = useAddUserPermission();
  const getPublicLinkHook = useGetPublicLink(entityType, entityId);

  const share = () => {
    if (!selectedPermission) {
      toast.error("Please select a valid permission.");
      return;
    }
    if (selecteduser.length == 0) {
      toast.error("Please select atleast one user to share permission.");
      return;
    }

    addUserPermissionHook.mutate(
      {
        accessRight: selectedPermission.value,
        entityId: entityId,
        accessType: entityType,
        userIds: selecteduser.map((user) => user.userId),
      },
      {
        onSuccess: () => {
          toast.success("Permissions added successfully.");
          setActionModal(false);
        },
      }
    );
  };

  const copyPublicLink = async () => {
    const url = (await getPublicLinkHook.refetch()).data;
    const link = `${window.location.hostname}/public-view/${url}`;
    console.log(link);
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="share-modal overflow-scroll">
      <div className="search-bar relative w-full mt-4">
        <div className="flex border-[1px] border-slate-400 bg-white rounded-sm mt-4">
          <UserSearchComp
            selecteduser={selecteduser}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
      </div>
      <div className="selected-user flex flex-wrap items-center pl-3 py-3">
        {selecteduser.map((user) => (
          <Tooltip.Provider key={user.userId}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="w-7 h-7 border-2 border-white rounded-full bg-primary-400 hover:border-primary-700 "></button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="TooltipContent bg-white text-primary-700 rounded-sm shadow-md px-3 py-2 text-xs z-10"
                  sideOffset={5}
                >
                  {user.firstName}
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </div>
      <div className="">
        <Menu
          as="div"
          className="relative z-0 w-full inline-block text-left ml-auto"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Menu.Button className="inline-flex w-full justify-center rounded-md ">
              <div className="border border-slate-200 py-2 px-3 w-full text-left">
                <span>{selectedPermission?.name || "Select Permission"}</span>
              </div>
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
            <Menu.Items className="absolute left-0 mt-2 w-full origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="px-1 py-1 ">
                {data?.map((opt) => (
                  <Menu.Item key={opt.value}>
                    <div
                      className="flex gap-4 p-2 hover:bg-primary-100 hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPermission(opt);
                      }}
                    >
                      <span>{opt.name}</span>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* <div className="flex flex-col gap-4 mt-4">
          <div className="flex gap-3 items-center">
            <input type="checkbox" id="checkbox1" />
            <label htmlFor="checkbox1">Approve additions</label>
          </div>
          <div className="flex gap-3 items-center">
            <input type="checkbox" id="checkbox2" />
            <label htmlFor="checkbox2">Some other permission</label>
          </div>
        </div> */}
        <div className="flex justify-between items-center mt-40">
          <button
            className="text-sm md:text-base px-4 md:px-10 py-3 rounded-sm border border-primary-400 text-primary-400"
            onClick={copyPublicLink}
          >
            Copy Public Link
          </button>
          <button
            className="bg-primary-400 text-white text-sm md:text-base px-6 md:px-10 py-3 rounded-sm disabled:opacity-75"
            onClick={share}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export const PermissionUserCard = (props: PermissionUserCardPropType) => {
  const [selectedPermission, setSelectedPermission] =
    useState<PermissionType | null>(props.accessRight);
  const [defaultOpen, setDefaultOpen] = useState<boolean>(false);
  const updateUserAccessHook = useUpdateUserPermission();
  const deleteUserAccessHook = useDeleteUserPermission();
  const updateUserAccess = () => {
    updateUserAccessHook.mutate(
      {
        accessRight: selectedPermission?.value || "",
        userId: props.userId,
        entityId: props.entityId,
        accessType: props.accessType,
      },
      {
        onSuccess: () => {
          setSelectedPermission(selectedPermission);
          setDefaultOpen(false);
          toast.success("Update the permission successfully.");
        },
      }
    );
  };

  const deleteUserAccess = () => {
    deleteUserAccessHook.mutate(
      {
        accessRight: props.accessRight.value,
        userIds: [props.userId],
        entityId: props.entityId,
        accessType: props.accessType,
        approvalRequired: true,
      },
      {
        onSuccess: () => {
          toast.success("Deleted user access.");
        },
      }
    );
  };

  return (
    <Disclosure as={Fragment} defaultOpen={defaultOpen}>
      {({ open, close }) => (
        <>
          <div className="flex gap-2">
            <Disclosure.Button className={cn("outline-none w-full")}>
              <div className="flex gap-3 items-center text-left">
                <div className="h-7 w-7 bg-primary-400 rounded-full"></div>
                <span>
                  {props.name} <br />{" "}
                  <span className="text-sm">{props.accessRight.name}</span>
                </span>
                {open ? (
                  <IconChevronUp className="ml-auto" />
                ) : (
                  <IconChevronDown className="ml-auto" />
                )}
                <button onClick={deleteUserAccess}>
                  <IconTrash />
                </button>
              </div>
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>
            <Menu
              as="div"
              className="relative w-full inline-block text-left ml-auto"
            >
              <div onClick={(e) => e.stopPropagation()}>
                <Menu.Button className="inline-flex w-full justify-center rounded-md ">
                  <div className="border border-slate-200 py-2 px-3 w-full text-left">
                    <span>{selectedPermission?.name}</span>
                  </div>
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
                <Menu.Items className="absolute left-0 mt-2 w-full origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {props.allAccessRights.map((opt) => (
                      <Menu.Item key={opt.value}>
                        <div
                          className="flex gap-4 p-2 hover:bg-primary-100 hover:cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPermission(opt);
                          }}
                        >
                          <span>{opt.name}</span>
                        </div>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-3 items-center">
                <input type="checkbox" id="checkbox1" />
                <label htmlFor="checkbox1">Approve additions</label>
              </div>
              <div className="flex gap-3 items-center">
                <input type="checkbox" id="checkbox2" />
                <label htmlFor="checkbox2">Some other permission</label>
              </div>
            </div> */}
            <div className="flex w-full justify-end mt-4">
              <button
                className="bg-primary-400 text-sm text-white px-8 py-2 rounded-sm disabled:opacity-75"
                disabled={selectedPermission == props.accessRight}
                onClick={() => {
                  updateUserAccess();
                  close();
                }}
              >
                Update
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export const ManageAccessModal = ({
  entityType,
  entityId,
  setActionModal,
}: BaseModalPropType) => {
  const getAllUserAccessHook = useGetAllUserAccessForEntity(
    entityType,
    entityId
  );
  const allAccessRightHook = useGetAllAccessRightForEntity(entityType);

  console.log(setActionModal, getAllUserAccessHook);
  return (
    <div className="share-modal overflow-scroll">
      <div className="mt-4 min-h-[340px] overflow-y-auto flex flex-col gap-3">
        {getAllUserAccessHook.isLoading && (
          <div>
            {" "}
            <p>Loading...</p>
          </div>
        )}
        {getAllUserAccessHook.data
          ? getAllUserAccessHook.data.map((obj) => (
              <PermissionUserCard
                key={obj.userId}
                {...obj}
                allAccessRights={allAccessRightHook.data || []}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export const ViewerDeleteModal = ({
  entityType,
  entityId,
}: {
  entityType: string;
  entityId: number;
}) => {
  const deleteAssetHook = useDeleteAssets();
  const deleteMemoryHook = useDeleteProject();

  const deleteHandler = async () => {
    if (entityType == EntityType.ASSET) {
      deleteAssetHook.mutate([entityId]);
    } else if (entityType == EntityType.MEMORY) {
      deleteMemoryHook.mutate(entityId);
    }
  };
  return (
    <>
      <div className="delete-modal">
        <span className="block mt-4">
          Are you sure you want to delete this item ?
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
