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
  DropdownActionModalsPropType,
  DropdownButtonPropType,
  EntityType,
  SourceMemory,
} from "../../types";
import {
  AddJournalModal,
  AddJourneyModal,
  AddMemoryUploadModal,
  ChangeBackgroundCollection,
  CollectionRenameModal,
  DeleteModal,
  JourneyRenameModal,
  ManageAccessModal,
  MemoryRenameModal,
  MoveCopyModal,
  ShareModal,
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
    name: "Upload",
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
  MOVE_ASSET: {
    id: 21,
    name: "Move",
    icon: <IconArrowBarToRight />,
  },
  COPY_ASSET: {
    id: 22,
    name: "Copy",
    icon: <IconCopy />,
  },
  MANAGE_ACCESS_COLLECTION: {
    id: 23,
    name: "Manage Access",
    icon: <></>,
  },
  MANAGE_ACCESS_JOURNEY: {
    id: 24,
    name: "Manage Access",
    icon: <></>,
  },
  UPLOAD_COLLECTION: {
    id: 25,
    name: "Upload",
    icon: <IconPlus />,
  },
  SHARE_MEMORY: {
    id: 26,
    name: "Share",
    icon: <IconUserShare />,
  },
  MANAGE_ACCESS_MEMORY: {
    id: 27,
    name: "Manage Access",
    icon: <></>,
  },
  ADD_MEMORY_DASHBOARD: {
    id: 28,
    name: "Create Memory",
    icon: <IconPlus />,
  },
};

export const CollectionDropdownList = [
  DropdownActions.VIEW,
  DropdownActions.RENAME_COLLECTION,
  DropdownActions.SHARE_COLLECTION,
  DropdownActions.DELETE_COLLECTION,
  DropdownActions.MANAGE_ACCESS_COLLECTION,
];

export const CollectionDetailsBannerDropdown = [
  DropdownActions.RENAME_COLLECTION,
  DropdownActions.CHANGE_BG_COLLECTION,
  DropdownActions.ADD_JOURNEY,
  DropdownActions.SHARE_COLLECTION,
  DropdownActions.DELETE_COLLECTION,
  DropdownActions.MANAGE_ACCESS_COLLECTION,
];

export const CollectionAddOnlyDropdown = [DropdownActions.UPLOAD_COLLECTION];

export const AssetDropdownList = [
  DropdownActions.VIEW,
  DropdownActions.DELETE_ASSET,
  DropdownActions.MOVE_ASSET,
  DropdownActions.COPY_ASSET,
];

export const JourneyCardDropdownList = [
  DropdownActions.VIEW,
  DropdownActions.RENAME_JOURNEY,
  DropdownActions.DELETE_JOURNEY,
  DropdownActions.SHARE_JOURNEY,
  DropdownActions.MOVE_JOURNEY,
  DropdownActions.COPY_JOURNEY,
  DropdownActions.MANAGE_ACCESS_JOURNEY,
];

export const JourneyBannerDropdownList = [
  DropdownActions.RENAME_JOURNEY,
  DropdownActions.CHANGE_BG_JOURNEY,
  DropdownActions.DELETE_JOURNEY,
  DropdownActions.SHARE_JOURNEY,
  DropdownActions.ADD_MEMORY,
  DropdownActions.MOVE_JOURNEY,
  DropdownActions.COPY_JOURNEY,
  DropdownActions.MANAGE_ACCESS_JOURNEY,
];

export const MemoryCardDropdownList = [
  DropdownActions.VIEW,
  DropdownActions.RENAME_MEMORY,
  DropdownActions.ADD_JOURNAL,
  DropdownActions.DELETE_MEMORY,
  DropdownActions.MOVE_MEMORY,
  DropdownActions.COPY_MEMORY,
  DropdownActions.SHARE_MEMORY,
  DropdownActions.MANAGE_ACCESS_MEMORY,
];

export const DropdownActionModals = ({
  action,
  actionModal,
  setActionModal,
  bulkIds,
  afterAction,
  entityId,
  entityType,
  bgImage,
  accessRight,
  name,
  ...rest
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
            entityType={entityType}
            setActionModal={setActionModal}
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
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
            entityId={entityId}
            setActionModal={setActionModal}
            afterAction={afterAction}
            bulkIds={bulkIds}
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
            entityId={entityId}
            setActionModal={setActionModal}
            bulkIds={bulkIds}
            afterAction={afterAction}
          />
        </Modal>
      )}
      {action == DropdownActions.SHARE_COLLECTION.id && (
        <Modal
          headerLabel="Share Collection"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ShareModal
            entityType={EntityType.COLLECTION}
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == DropdownActions.SHARE_JOURNEY.id && (
        <Modal
          headerLabel="Share Journey"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ShareModal
            entityType={EntityType.JOURNEY}
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
          />
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
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            entityType={entityType}
            title={rest.title ? (rest.title as string) : ""}
            caption={rest.caption ? (rest.caption as string) : ""}
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
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            entityType={entityType}
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
            entityId={entityId}
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
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            entityType={entityType}
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
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
            bulkIds={bulkIds}
            afterAction={afterAction}
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
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            entityType={entityType}
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
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
            afterAction={afterAction}
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
            entityId={entityId}
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
          <AddMemoryUploadModal
            collectionId={
              rest.collectionId ? (rest.collectionId as number) : -1
            }
            journeyId={rest.journeyId ? (rest.journeyId as number) : -1}
            source={SourceMemory.MEMORY}
            setActionModal={setActionModal}
          />
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
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            entityType={entityType}
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
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
            bulkIds={bulkIds}
            afterAction={afterAction}
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
            entityId={entityId}
            setActionModal={setActionModal}
            bulkIds={bulkIds}
            afterAction={afterAction}
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
            entityId={entityId}
            setActionModal={setActionModal}
            bulkIds={bulkIds}
            afterAction={afterAction}
          />
        </Modal>
      )}
      {action == 21 && (
        <Modal
          headerLabel="Move"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MoveCopyModal
            mode="MOVE"
            entityType={EntityType.ASSET}
            entityId={entityId}
            setActionModal={setActionModal}
            bulkIds={bulkIds}
            afterAction={afterAction}
          />
        </Modal>
      )}
      {action == 22 && (
        <Modal
          headerLabel="Copy"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <MoveCopyModal
            mode="COPY"
            entityType={EntityType.ASSET}
            entityId={entityId}
            setActionModal={setActionModal}
            bulkIds={bulkIds}
            afterAction={afterAction}
          />
        </Modal>
      )}
      {action == DropdownActions.UPLOAD.id && (
        <Modal
          headerLabel=""
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <AddMemoryUploadModal
            collectionId={-1}
            journeyId={-1}
            source={SourceMemory.UPLOAD}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == DropdownActions.MANAGE_ACCESS_JOURNEY.id && (
        <Modal
          headerLabel="Manage Access"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ManageAccessModal
            entityType={EntityType.JOURNEY}
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == DropdownActions.MANAGE_ACCESS_COLLECTION.id && (
        <Modal
          headerLabel="Manage Access"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ManageAccessModal
            entityType={EntityType.COLLECTION}
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == DropdownActions.UPLOAD_COLLECTION.id && (
        <Modal
          headerLabel=""
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <AddMemoryUploadModal
            collectionId={
              rest.collectionId ? (rest.collectionId as number) : -1
            }
            journeyId={rest.journeyId ? (rest.journeyId as number) : -1}
            source={SourceMemory.UPLOAD}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == DropdownActions.SHARE_MEMORY.id && (
        <Modal
          headerLabel="Share Memory"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ShareModal
            entityType={EntityType.MEMORY}
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == DropdownActions.MANAGE_ACCESS_MEMORY.id && (
        <Modal
          headerLabel="Manage Access"
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <ManageAccessModal
            entityType={EntityType.MEMORY}
            entityId={entityId}
            name={name}
            bgImage={bgImage}
            accessRight={accessRight}
            setActionModal={setActionModal}
          />
        </Modal>
      )}
      {action == DropdownActions.ADD_MEMORY_DASHBOARD.id && (
        <Modal
          headerLabel=""
          openModal={actionModal}
          setOpenModal={setActionModal}
        >
          <AddMemoryUploadModal
            collectionId={-1}
            journeyId={-1}
            source={SourceMemory.MEMORY_DASHBOARD}
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
