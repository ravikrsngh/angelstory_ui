import { Menu, Transition } from "@headlessui/react";
import {
  IconDotsVertical,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import { Fragment, useState } from "react";
import {
  AccessTypeGroups,
  AssetResType,
  AssetTypes,
  BasicStyleCardPropType,
  CollectionType,
  EntityType,
  JourneyType,
  MemoryType,
  NewCardPropsType,
  ViewAllCardPropType,
} from "../../types";
import { cn, getHeaderIcon } from "../../utils";
import {
  DropdownActionModals,
  DropdownActions,
  DropdownButton,
} from "./dropdown-action-buttons";
import { FilesViewerItemType } from "./files-viewer";
import { Modal } from "./modal";

const BasicStyleCard = ({
  type,
  name,
  onClickHandler,
  dataObject,
  children,
}: BasicStyleCardPropType) => {
  return (
    <div>
      <div
        className="p-3 bg-primary-100 w-64 h-min rounded-lg"
        onClick={onClickHandler as () => void}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center overflow-hidden">
            <div className="text-primary-400">{getHeaderIcon(type)}</div>
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
              {name}
            </span>
          </div>
          {children}
        </div>
        <div
          className={cn(
            "w-full overflow-hidden mt-2 flex justify-center items-center h-[240px] bg-cover bg-center"
          )}
          style={{
            backgroundImage: `url(${
              dataObject
                ? (dataObject as AssetResType).assetUrl ||
                  (dataObject as MemoryType).previewImage ||
                  (dataObject as CollectionType).bgImage ||
                  (dataObject as JourneyType).bgImage ||
                  ""
                : ""
            })`,
          }}
        >
          {type == AssetTypes.VIDEO && <IconPlayerPlay />}
          {type == AssetTypes.AUDIO && <IconPlayerPlay />}
        </div>
      </div>
    </div>
  );
};

export const NewCard = ({
  type,
  name,
  dropdownOptions,
  onClickHandler,
  dataObject,
}: NewCardPropsType) => {
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [action, setAction] = useState<number | null>(null);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const isDropdownAccess = [
    ...AccessTypeGroups.OWNER,
    ...AccessTypeGroups.EDIT,
  ].includes(
    dataObject && dataObject.accessRight
      ? dataObject.accessRight
      : "COLLECTION_ADD"
  );

  const prepare_data_for_viewer = (): FilesViewerItemType => {
    const fileViewObj = {
      type: "",
      src: "",
      name: "",
      entityType: "",
      id: -1,
    };
    if (dataObject) {
      if ("assetType" in dataObject) {
        fileViewObj.type = dataObject.assetType;
        fileViewObj.entityType = EntityType.ASSET;
        fileViewObj.id = dataObject.id;
        fileViewObj.src = dataObject.assetUrl;
      } else if ("projectType" in dataObject) {
        fileViewObj.type = dataObject.projectType;
        fileViewObj.entityType = EntityType.MEMORY;
        fileViewObj.id = dataObject.id;
        fileViewObj.src = dataObject.previewImage;
        fileViewObj.name = dataObject.name;
      }
    }

    return fileViewObj;
  };

  const clickHandler = () => {
    // if (type == AssetTypes.IMAGE || type == AssetTypes.AUDIO) {
    //   setPreviewModal(true);
    // } else if (type == AssetTypes.FOLDER && onClickHandler) {
    //   onClickHandler();
    // } else if (type == MemoryTypes.CARD || type == MemoryTypes.SLIDESHOW) {
    //   const obj = dataObject as MemoryType;
    //   console.log(obj);
    //   navigate(`/design/${obj.collectionId}/${obj.journeyId}/${obj.id}`);
    // }
    if (onClickHandler) {
      if (onClickHandler.length == 0) {
        (onClickHandler as () => void)();
      } else if (onClickHandler.length == 1) {
        onClickHandler(prepare_data_for_viewer());
      }
    }
  };

  const onClickDropdownOptions = (action: number) => {
    if (action == DropdownActions.VIEW.id) {
      // if (type == AssetTypes.FOLDER && onClickHandler) {
      //   onClickHandler();
      // } else if (type == AssetTypes.IMAGE || type == AssetTypes.AUDIO) {
      //   setPreviewModal(true);
      // } else if (type == MemoryTypes.CARD || type == MemoryTypes.SLIDESHOW) {
      //   const obj = dataObject as MemoryType;
      //   console.log(obj);
      //   navigate(`/design/${obj.collectionId}/${obj.journeyId}/${obj.id}`);
      // }
      clickHandler();
    } else {
      setAction(action);
      setActionModal(true);
    }
  };

  return (
    <>
      <BasicStyleCard
        type={type}
        name={name}
        onClickHandler={clickHandler}
        dataObject={dataObject}
      >
        {dropdownOptions.length > 0 && isDropdownAccess && (
          <Menu as="div" className="relative inline-block text-left ml-auto">
            <div onClick={(e) => e.stopPropagation()}>
              <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-primary-700">
                <IconDotsVertical
                  className="-mr-1 ml-2 h-5 w-5 text-primary-700"
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
              <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div
                  className="px-1 py-1 "
                  onClick={(e) => e.stopPropagation()}
                >
                  {dropdownOptions.map((opt) => (
                    <Menu.Item key={opt.id}>
                      <DropdownButton
                        icon={opt.icon}
                        name={opt.name}
                        onClickHandler={() => onClickDropdownOptions(opt.id)}
                      />
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </BasicStyleCard>
      <DropdownActionModals
        dataObject={dataObject ? dataObject : null}
        action={action ? action : null}
        actionModal={actionModal}
        setActionModal={setActionModal}
      />
      <Modal
        openModal={previewModal}
        setOpenModal={setPreviewModal}
        headerLabel=""
      >
        <div className="mb-4 flex gap-2">
          <button>
            <IconTrash />
          </button>
        </div>
        <div className="max-h-[800px] flex justify-center items-center overflow-hidden">
          {type == AssetTypes.IMAGE && (
            <img
              src={
                (dataObject as AssetResType).assetUrl ||
                (dataObject as MemoryType).previewImage
              }
              className="w-full"
            />
          )}
          {type == AssetTypes.AUDIO && (
            <audio
              src={
                (dataObject as AssetResType).assetUrl ||
                (dataObject as MemoryType).previewImage
              }
              controls
              className="w-full"
            ></audio>
          )}
        </div>
      </Modal>
    </>
  );
};

export const ViewAllCard = ({
  type,
  name,
  onClickHandler,
  defaultChecked,
  onChangeHandler,
  dataObject,
}: ViewAllCardPropType) => {
  return (
    <BasicStyleCard
      type={type}
      name={name}
      onClickHandler={onClickHandler}
      dataObject={dataObject}
    >
      <div>
        <input
          type="checkbox"
          name=""
          id=""
          defaultChecked={defaultChecked}
          onChange={onChangeHandler}
        />
      </div>
    </BasicStyleCard>
  );
};
