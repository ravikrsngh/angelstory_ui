import { Menu, Transition } from "@headlessui/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { IconArrowLeft } from "@tabler/icons-react";
import React, {
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
import {
  createBulkAssetType,
  useBulkCreateAssets,
} from "../../hooks/assets/use-bulk-upload";
import { useDeleteAssets } from "../../hooks/assets/use-delete-assets";
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
import { useCreateProject } from "../../hooks/project/use-create-project";
import { useDeleteProject } from "../../hooks/project/use-delete-project";
import { useMoveProjects } from "../../hooks/project/use-move-projects";
import { useSaveProject } from "../../hooks/project/use-save-project";
import { uploadFiles } from "../../service/aws";
import {
  AssetResType,
  CollectionJourneyType,
  CollectionType,
  DataObjectType,
  EntityType,
  FileTypeMap,
  JourneyType,
  MemoryType,
  MemoryTypes,
  MoveCopyModalPropType,
  ProjectDimensionType,
  ShareModalPropType,
  SourceMemory,
  StageLists,
  UserSearchResType,
} from "../../types";
import { cn } from "../../utils";
import { PermissionUserCard } from "../templates-reference/all-modals";
import { Input } from "./input";
import SelectCardSize from "./select-card-size";
import SelectFolder from "./select-folder";
import { UserSearchComp } from "./share-modal-comp";
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
        collectionId: (dataObject as CollectionType).entityId,
        bgColor: (dataObject as CollectionType).bgColor,
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
          defaultValue={(dataObject as CollectionType)?.name}
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
    (dataObject as CollectionJourneyType)?.bgColor?.length == 6
      ? (dataObject as CollectionJourneyType).bgColor
      : "#FEF8F1"
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
  bulkIds,
  dataObject,
  setActionModal,
}: {
  entityType: string;
  dataObject: DataObjectType;
  bulkIds?: number[];
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
    } else if (bulkIds && bulkIds.length > 0) {
      if (entityType == EntityType.ASSET) {
        deleteAssetHook.mutate(bulkIds);
      } else if (entityType == EntityType.JOURNEY) {
        deleteJourneyHook.mutate(bulkIds);
      }
    }
    setActionModal(false);
  };
  return (
    <>
      <div className="delete-modal">
        <span className="block mt-4">
          Are you sure you want to delete{" "}
          {(dataObject as CollectionJourneyType)?.name} ?
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
    bullUploadHook.mutate(payload);
  };

  const afterSelectingFolders = async () => {
    // Validate Selection
    if (
      ([SourceMemory.MEMORY, SourceMemory.MEMORY_DASHBOARD].includes(source) ||
        saveAsMemory) &&
      (toCollectionId == -1 || toJourneyId == -1)
    ) {
      toast.error(
        "To save a memory we need to select both a collection and journey."
      );
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
            <h3 className="text-xl">Create Memory</h3>
            <div className="flex justify-between items-center h-[300px] mt-6">
              <UploadArea
                setFiles={setFiles}
                nextBtnHandler={() => setStage(StageLists.VIEW_UPLOADS)}
              />
              {source == SourceMemory.UPLOAD ? null : (
                <>
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
            <h3 className="text-xl"> Choose Location</h3>
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
  bulkIds,
  setActionModal,
}: MoveCopyModalPropType) => {
  const [toCollectionId, setToCollectionId] = useState<number>(-1);
  const [toJourneyId, setToJourneyId] = useState<number>(-1);
  const moveJourneyHook = useMoveJourney();
  const moveProjectHook = useMoveProjects();
  const moveAssetHook = useMoveAssets();
  const moveOrCopy = () => {
    if (entityType == EntityType.JOURNEY) {
      if (toCollectionId == -1) {
        toast.error("Please select a valid location");
        return;
      }
      moveJourneyHook.mutate({
        mode: mode,
        collectionId: toCollectionId,
        journeyId: bulkIds ? bulkIds : [(dataObject as JourneyType).id],
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
        projectId: bulkIds ? bulkIds : [(dataObject as MemoryType).id],
      });
    } else if (entityType == EntityType.ASSET) {
      if (toCollectionId == -1 && toJourneyId == -1) {
        toast.error("Please select a valid location.");
        return;
      }
      const payload: moveAssetType = {
        mode: mode,
        newCollectionId: toCollectionId,
        assetId: bulkIds ? bulkIds : [(dataObject as AssetResType).id],
      };
      if (toJourneyId != -1) {
        payload.newJourneyId = toJourneyId;
      }
      moveAssetHook.mutate(payload);
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

export const ShareModal = ({
  entityType,
  dataObject,
  setActionModal,
}: ShareModalPropType) => {
  const [selecteduser, setSelectedUsers] = useState<UserSearchResType[]>([]);
  const { data } = useGetAllAccessRightForEntity(entityType);
  const [selectedPermission, setSelectedPermission] = useState<string | null>(
    null
  );
  const addUserPermissionHook = useAddUserPermission();

  const share = () => {
    if (!selectedPermission) {
      toast.error("Please select a valid permission.");
      return;
    }
    if (selecteduser.length == 0) {
      toast.error("Please select atleast one user to share permission.");
      return;
    }

    let entityId = null;
    if (dataObject) {
      if ("entityId" in dataObject) {
        entityId = dataObject.entityId;
      } else {
        entityId = dataObject.id;
      }
      addUserPermissionHook.mutate(
        {
          accessRight: selectedPermission,
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
    } else {
      toast.error("Invalid Object");
    }
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
                <span>{selectedPermission || "Select Permission"}</span>
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
                  <Menu.Item key={opt}>
                    <div
                      className="flex gap-4 p-2 hover:bg-primary-100 hover:cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPermission(opt);
                      }}
                    >
                      <span>{opt}</span>
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
          <button className="px-10 py-3 rounded-sm border border-primary-400 text-primary-400">
            Copy Public Link
          </button>
          <button
            className="bg-primary-400 text-white px-10 py-3 rounded-sm disabled:opacity-75"
            onClick={share}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export const ManageAccessModal = ({
  entityType,
  dataObject,
  setActionModal,
}: ShareModalPropType) => {
  const getAllUserAccessHook = useGetAllUserAccessForEntity(
    entityType,
    dataObject
      ? "entityId" in dataObject
        ? dataObject.entityId
        : dataObject.id
      : -1
  );
  const allAccessRightHook = useGetAllAccessRightForEntity(entityType);

  console.log(setActionModal, getAllUserAccessHook);
  return (
    <div className="share-modal overflow-scroll">
      <div className="mt-4 min-h-[340px] overflow-y-auto flex flex-col gap-3">
        {(getAllUserAccessHook.isLoading ||
          getAllUserAccessHook.isFetching) && (
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
