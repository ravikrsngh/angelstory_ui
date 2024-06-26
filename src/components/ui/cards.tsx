import { Menu, Transition } from "@headlessui/react";
import {
  IconDotsVertical,
  IconPlayerPlay,
  IconTrash,
} from "@tabler/icons-react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  AccessTypeGroups,
  AssetTypes,
  BasicStyleCardPropType,
  NewCardPropsType,
  ViewAllCardPropType,
} from "../../types";
import { cn, getHeaderIcon } from "../../utils";
import {
  DropdownActionModals,
  DropdownActions,
  DropdownButton,
} from "./dropdown-action-buttons";
import { Modal } from "./modal";

const BasicStyleCard = ({
  type,
  name,
  onClickHandler,
  bgImage,
  children,
  className,
}: BasicStyleCardPropType) => {
  return (
    <div>
      <div
        className={cn(
          "p-3 bg-primary-100 w-[180px] md:w-[249px] h-min rounded-lg",
          className
        )}
        onClick={onClickHandler as () => void}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center overflow-hidden">
            <div className="text-primary-400">{getHeaderIcon(type)}</div>
            <span className="text-xs md:text-sm overflow-hidden whitespace-nowrap text-ellipsis">
              {name}
            </span>
          </div>
          {children}
        </div>
        <div
          className={cn(
            "w-full overflow-hidden mt-2 flex justify-center items-center h-[130px] md:h-[190px] bg-cover bg-center"
          )}
          style={{
            backgroundImage: `url(${bgImage})`,
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
  entityId,
  entityType,
  bgImage,
  accessRight,
  className,
  ...rest
}: NewCardPropsType) => {
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [action, setAction] = useState<number | null>(null);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownPosition, setDropdownPosition] =
    useState<string>("origin-top-left");
  const isDropdownAccess = [
    ...AccessTypeGroups.OWNER,
    ...AccessTypeGroups.EDIT,
  ].includes(accessRight);

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

  useEffect(() => {
    const handlePosition = () => {
      console.log("ascg");
      if (triggerRef.current && dropdownRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();

        const spaceAbove = triggerRect.top;
        const spaceBelow = window.innerHeight - triggerRect.bottom;
        const spaceLeft = triggerRect.left;
        const spaceRight = window.innerWidth - triggerRect.right;

        if (spaceBelow >= dropdownRect.height || spaceBelow >= spaceAbove) {
          setDropdownPosition("origin-top-left");
        } else if (spaceAbove >= dropdownRect.height) {
          setDropdownPosition("origin-top");
        } else if (spaceRight >= dropdownRect.width) {
          setDropdownPosition("origin-top-right");
        } else if (spaceLeft >= dropdownRect.width) {
          setDropdownPosition("origin-bottom");
        } else {
          setDropdownPosition("origin-top-left");
        }
      }
    };
    window.addEventListener("resize", handlePosition);
    window.addEventListener("scroll", handlePosition);
  }, [triggerRef]);

  return (
    <>
      <BasicStyleCard
        type={type}
        name={name}
        onClickHandler={clickHandler}
        entityId={entityId}
        entityType={entityType}
        bgImage={bgImage}
        accessRight={accessRight}
        className={className}
      >
        {dropdownOptions.length > 0 && isDropdownAccess && (
          <Menu as="div" className="relative inline-block text-left ml-auto">
            <div onClick={(e) => e.stopPropagation()}>
              <Menu.Button
                ref={triggerRef}
                className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-primary-700"
              >
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
              <Menu.Items
                ref={dropdownRef}
                className={cn(
                  "absolute left-0 mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none",
                  dropdownPosition
                )}
              >
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
        action={action ? action : null}
        actionModal={actionModal}
        setActionModal={setActionModal}
        entityId={entityId}
        entityType={entityType}
        name={name}
        bgImage={bgImage}
        accessRight={accessRight}
        {...rest}
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
          {type == AssetTypes.IMAGE && <img src={bgImage} className="w-full" />}
          {type == AssetTypes.AUDIO && (
            <audio src={bgImage} controls className="w-full"></audio>
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
  entityId,
  entityType,
  bgImage,
  accessRight,
  className,
}: ViewAllCardPropType) => {
  return (
    <BasicStyleCard
      type={type}
      name={name}
      onClickHandler={onClickHandler}
      entityId={entityId}
      entityType={entityType}
      bgImage={bgImage}
      accessRight={accessRight}
      className={className}
    >
      <div>
        {[...AccessTypeGroups.OWNER, ...AccessTypeGroups.EDIT].includes(
          accessRight
        ) ? (
          <input
            type="checkbox"
            name=""
            id=""
            checked={defaultChecked}
            onChange={onChangeHandler}
          />
        ) : null}
      </div>
    </BasicStyleCard>
  );
};
