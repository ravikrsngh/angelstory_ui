import { Menu, Transition } from "@headlessui/react";
import {
  IconCheck,
  IconDotsVertical,
  IconFolderFilled,
  IconMusic,
  IconPhoto,
  IconPlayerPlay,
  IconTrash,
  IconVideo,
  IconX,
} from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AssetResType,
  AssetTypes,
  MemoryType,
  MemoryTypes,
  NewCardPropsType,
} from "../../types";
import { cn } from "../../utils";
import {
  DropdownActionModals,
  DropdownActions,
  DropdownButton,
} from "./dropdown-action-buttons";
import { Modal } from "./modal";

export const NewCard = ({
  type,
  name,
  needs_approval,
  dropdownOptions,
  onClickHandler,
  dataObject,
}: NewCardPropsType) => {
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [action, setAction] = useState<number | null>(null);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    if (type == AssetTypes.IMAGE || type == AssetTypes.AUDIO) {
      setPreviewModal(true);
    } else if (type == AssetTypes.FOLDER && onClickHandler) {
      onClickHandler();
    } else if (type == MemoryTypes.CARD || type == MemoryTypes.SLIDESHOW) {
      let obj = dataObject as MemoryType;
      console.log(obj);
      navigate(`/design/${obj.collectionId}/${obj.id}`);
    }
  };

  const onClickDropdownOptions = (action: number) => {
    if (action == DropdownActions.VIEW.id) {
      if (type == AssetTypes.FOLDER && onClickHandler) {
        onClickHandler();
      } else if (type == AssetTypes.IMAGE || type == AssetTypes.AUDIO) {
        setPreviewModal(true);
      } else if (type == MemoryTypes.CARD || type == MemoryTypes.SLIDESHOW) {
        let obj = dataObject as MemoryType;
        console.log(obj);
        navigate(`/design/${obj.collectionId}/${obj.id}`);
      }
    } else {
      setAction(action);
      setActionModal(true);
    }
  };

  const getHeaderIcon = () => {
    if (type == AssetTypes.FOLDER) {
      return <IconFolderFilled />;
    } else if (type == AssetTypes.IMAGE) {
      return <IconPhoto />;
    } else if (type == AssetTypes.AUDIO) {
      return <IconMusic />;
    } else if (type == AssetTypes.VIDEO) {
      return <IconVideo />;
    }
    return <></>;
  };

  return (
    <>
      <div>
        <div className="p-3 bg-primary-100 w-64 h-min" onClick={clickHandler}>
          <div className="header flex gap-3 items-center">
            <div className=" text-primary-400">{getHeaderIcon()}</div>
            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
              {name}
            </span>
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
          </div>

          <div
            className={cn(
              "w-full overflow-hidden mt-2 flex justify-center items-center h-[240px]"
            )}
          >
            {type == AssetTypes.IMAGE && (
              <img
                src={(dataObject as AssetResType).assetUrl}
                className="w-full"
              />
            )}
            {type == AssetTypes.VIDEO && <IconPlayerPlay />}
            {type == AssetTypes.AUDIO && <IconPlayerPlay />}
          </div>
        </div>
        {needs_approval ? (
          <div
            className="p-3 flex justify-center items-center gap-4 bg-white mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button>
              <IconCheck />
            </button>
            <button>
              <IconX />
            </button>
          </div>
        ) : null}
      </div>
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
              src={(dataObject as AssetResType).assetUrl}
              className="w-full"
            />
          )}
          {type == AssetTypes.AUDIO && (
            <audio
              src={(dataObject as AssetResType).assetUrl}
              controls
              className="w-full"
            ></audio>
          )}
        </div>
      </Modal>
    </>
  );
};
