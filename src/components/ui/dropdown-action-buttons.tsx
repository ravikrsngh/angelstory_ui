import {
  IconArrowBarToRight,
  IconBackground,
  IconCopy,
  IconEdit,
  IconEye,
  IconPlus,
  IconTextPlus,
  IconTrash,
  IconUserShare,
} from "@tabler/icons-react";
import {
  AssetResType,
  CollectionType,
  DropdownActionModalsPropType,
  DropdownButtonPropType,
  EntityType,
  JourneyType,
  MemoryType,
} from "../../types";
import { ShareModalTemp } from "../templates-reference/all-modals";
import {
  AddJournalModal,
  AddJourneyModal,
  AddMemoryModal,
  ChangeBackgroundCollection,
  CollectionRenameModal,
  DeleteModal,
  JourneyRenameModal,
  MemoryRenameModal,
  MoveCopyModal,
} from "./all-modals";
import { Modal } from "./modal";

export const DropdownActions = {
  VIEW: {
    id: 1,
    name: "View",
    icon: <IconEye />,
  },
  DELETE_COLLECTION: {
    id: 2,
    name: "Delete",
    icon: <IconTrash />,
  },
  MOVE_JOURNEY: {
    id: 3,
    name: "Move",
    icon: <IconArrowBarToRight />,
  },
  COPY_JOURNEY: {
    id: 4,
    name: "Copy",
    icon: <IconCopy />,
  },
  SHARE_COLLECTION: {
    id: 5,
    name: "Share",
    icon: <IconUserShare />,
  },
  ADD_JOURNAL: {
    id: 6,
    name: "Add Journal",
    icon: <IconTextPlus />,
  },
  CHANGE_BG_COLLECTION: {
    id: 7,
    name: "Change Background",
    icon: <IconBackground />,
  },
  RENAME_COLLECTION: {
    id: 8,
    name: "Rename",
    icon: <IconEdit />,
  },
  ADD_JOURNEY: {
    id: 9,
    name: "Add Journey",
    icon: <IconPlus />,
  },
  ADD_MEMORY: {
    id: 10,
    name: "Create Memory",
    icon: <IconPlus />,
  },
  RENAME_JOURNEY: {
    id: 11,
    name: "Rename",
    icon: <IconEdit />,
  },
  CHANGE_BG_JOURNEY: {
    id: 12,
    name: "Change Background",
    icon: <IconBackground />,
  },
  DELETE_ASSET: {
    id: 13,
    name: "Delete",
    icon: <IconTrash />,
  },
  DELETE_JOURNEY: {
    id: 14,
    name: "Delete",
    icon: <IconTrash />,
  },
  SHARE_JOURNEY: {
    id: 15,
    name: "Share",
    icon: <IconUserShare />,
  },
  UPLOAD: {
    id: 16,
    name: "Share",
    icon: <IconUserShare />,
  },
  RENAME_MEMORY: {
    id: 17,
    name: "Rename",
    icon: <IconEdit />,
  },
  DELETE_MEMORY: {
    id: 18,
    name: "Delete",
    icon: <IconTrash />,
  },
  MOVE_MEMORY: {
    id: 19,
    name: "Move",
    icon: <IconArrowBarToRight />,
  },
  COPY_MEMORY: {
    id: 20,
    name: "Copy",
    icon: <IconCopy />,
  },
};

export const CollectionDropdownList = [
  DropdownActions.VIEW,
  DropdownActions.RENAME_COLLECTION,
  DropdownActions.SHARE_COLLECTION,
  DropdownActions.DELETE_COLLECTION,
];

export const CollectionDetailsBannerDropdown = [
  DropdownActions.RENAME_COLLECTION,
  DropdownActions.CHANGE_BG_COLLECTION,
  DropdownActions.ADD_JOURNEY,
  DropdownActions.SHARE_COLLECTION,
  DropdownActions.DELETE_COLLECTION,
];

export const AssetDropdownList = [
  DropdownActions.VIEW,
  DropdownActions.DELETE_ASSET,
];

export const JourneyCardDropdownList = [
  DropdownActions.VIEW,
  DropdownActions.RENAME_JOURNEY,
  DropdownActions.DELETE_JOURNEY,
  DropdownActions.SHARE_JOURNEY,
  DropdownActions.MOVE_JOURNEY,
  DropdownActions.COPY_JOURNEY,
];

export const JourneyBannerDropdownList = [
  DropdownActions.RENAME_JOURNEY,
  DropdownActions.CHANGE_BG_JOURNEY,
  DropdownActions.DELETE_JOURNEY,
  DropdownActions.SHARE_JOURNEY,
  DropdownActions.ADD_MEMORY,
  DropdownActions.MOVE_JOURNEY,
  DropdownActions.COPY_JOURNEY,
];

export const MemoryCardDropdownList = [
  DropdownActions.VIEW,
  DropdownActions.RENAME_MEMORY,
  DropdownActions.ADD_JOURNAL,
  DropdownActions.DELETE_MEMORY,
  DropdownActions.MOVE_MEMORY,
  DropdownActions.COPY_MEMORY,
];

export const DropdownActionModals = ({
  dataObject,
  action,
  actionModal,
  setActionModal,
}: DropdownActionModalsPropType) => {
  return (
    <>
      {action == 2 && (
        <Modal
          headerLabel="Delete Collection"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <DeleteModal
            entityType="COLLECTION"
            dataObject={dataObject as CollectionType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 3 && (
        <Modal
          headerLabel="Move"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MoveCopyModal
            mode="MOVE"
            entityType={EntityType.JOURNEY}
            dataObject={dataObject as JourneyType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 4 && (
        <Modal
          headerLabel="Copy"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MoveCopyModal
            mode="COPY"
            entityType={EntityType.JOURNEY}
            dataObject={dataObject as JourneyType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 5 && (
        <Modal
          headerLabel="Share Modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ShareModalTemp />
        </Modal>
      )}
      {action == 6 && (
        <Modal
          headerLabel="Add Journal Modal"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <AddJournalModal
            setActionModal={setActionModal}
            dataObject={dataObject as MemoryType}
          />
        </Modal>
      )}
      {action == 8 && (
        <Modal
          headerLabel="Rename Collection"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <CollectionRenameModal
            setActionModal={setActionModal}
            dataObject={dataObject as CollectionType}
          />
        </Modal>
      )}
      {action == 7 && (
        <Modal
          headerLabel="Change Background"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ChangeBackgroundCollection
            entityType={EntityType.COLLECTION}
            dataObject={dataObject as CollectionType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 9 && (
        <Modal
          headerLabel="Add Journey"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <AddJourneyModal
            dataObject={dataObject as CollectionType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 13 && (
        <Modal
          headerLabel="Delete Asset"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <DeleteModal
            entityType={EntityType.ASSET}
            dataObject={dataObject as AssetResType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 11 && (
        <Modal
          headerLabel="Rename Journey"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <JourneyRenameModal
            setActionModal={setActionModal}
            dataObject={dataObject as JourneyType}
          />
        </Modal>
      )}
      {action == 14 && (
        <Modal
          headerLabel="Delete Journey"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <DeleteModal
            entityType={EntityType.JOURNEY}
            dataObject={dataObject as JourneyType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 12 && (
        <Modal
          headerLabel="Change Background"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ChangeBackgroundCollection
            entityType={EntityType.JOURNEY}
            dataObject={dataObject as JourneyType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 10 && (
        <Modal
          headerLabel=""
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          {dataObject ? (
            <AddMemoryModal
              collectionId={(dataObject as JourneyType).collectionId}
              journeyId={(dataObject as JourneyType).id}
            />
          ) : (
            <AddMemoryModal collectionId={-1} journeyId={-1} />
          )}
        </Modal>
      )}
      {action == 17 && (
        <Modal
          headerLabel="Rename Memory"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MemoryRenameModal
            setActionModal={setActionModal}
            dataObject={dataObject as MemoryType}
          />
        </Modal>
      )}
      {action == 18 && (
        <Modal
          headerLabel="Delete Memory"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <DeleteModal
            entityType={EntityType.MEMORY}
            dataObject={dataObject as MemoryType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 19 && (
        <Modal
          headerLabel="Move"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MoveCopyModal
            mode="MOVE"
            entityType={EntityType.MEMORY}
            dataObject={dataObject as MemoryType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == 20 && (
        <Modal
          headerLabel="Copy"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MoveCopyModal
            mode="COPY"
            entityType={EntityType.MEMORY}
            dataObject={dataObject as MemoryType}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
    </>
  );
};

export const DropdownButton = ({
  icon,
  name,
  onClickHandler,
}: DropdownButtonPropType) => {
  return (
    <div
      className="flex gap-4 p-2 hover:bg-primary-100 hover:cursor-pointer"
      onClick={onClickHandler}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );
};
