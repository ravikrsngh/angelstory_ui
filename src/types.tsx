import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { FilesViewerItemType } from "./components/ui/files-viewer";

export type SlideMusic = {
  name: string;
  url: string;
  startTime: number;
  duration: number;
};

export type SlideType = {
  content: string;
  duration: number;
  previewImg: string | undefined;
  history: (string | null)[];
  music?: SlideMusic;
};

export type SlideShowPanelType = {
  slides: SlideType[];
  setSlides: Dispatch<SetStateAction<SlideType[]>>;
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
};
export type SlideCardType = {
  isActive: boolean;
  slideNumber: number;
  slide: SlideType;
  setSelectedMusic: Dispatch<SetStateAction<SlideMusic | null>>;
};

export type CanvasContextType = {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  recordChange: () => void;
  slides: SlideType[];
  setSlides: Dispatch<SetStateAction<SlideType[]>>;
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  deleteObject: () => void;
};

export type EditObjectType = {
  object: fabric.Object | fabric.Group | undefined | fabric.Text;
};

export type EditInputBoxType = {
  containerClassName?: string;
  icon?: React.ReactNode;
  inputClassName?: string;
  type?: string;
  id?: string;
  defaultValue?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  min?: number;
  max?: number;
};

export type GoogleFontResponseType = {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  category: string;
  kind: string;
  menu: string;
};

// Template API Data
export type TemplateType = {
  id: number;
  previewImage: string;
  formattedData: string;
  price: number;
  collectionId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  premium: boolean;
};

export type CollectionType = {
  createdAt: string;
  createdBy: number;
  entityId: number;
  name: string;
  bgColor: string;
  accessRight: string;
  bgImage: string;
};

export type CollectionCardType = {
  name: string;
  id: number;
  bgColor: string;
};

export type CreateProjectInputType = {
  collectionId: string | null | number;
  formattedData: string | null;
  height: number | null;
  name: string;
  projectType: string | null;
  width: number | null;
  previewImage: string | null;
};

export type CreateProjectPropType = {
  displayCreateProject: boolean;
  setDisplayCreateProject: Dispatch<SetStateAction<boolean>>;
  initialStep: number;
  initalValue: CreateProjectInputType;
};

export type CreateProjectStepPropType = {
  projData: CreateProjectInputType;
  setProjData: Dispatch<SetStateAction<CreateProjectInputType>>;
  setStep: Dispatch<SetStateAction<number>>;
};

export type SizeResType = {
  id: number;
  width: number;
  height: number;
  label: string;
};

export type DesignType = {
  id: number;
  width: number;
  height: number;
  formattedData: string;
  projectType: string;
  name: string;
  collectionId: number;
  previewImage: string;
};

export type DesignUpdateType = {
  caption?: string;
  collectionId?: number;
  formattedData?: string;
  height?: number;
  journeyId?: number;
  name?: string;
  previewImage?: string;
  projectId?: number;
  projectType?: string;
  title?: string;
  width?: number;
};

export type DesignLoaderPropType = {
  ratio: number;
  originalWidth: number;
  name: string;
  projectType: string;
  saveProject: (
    obj: { formattedData?: string | undefined; name?: string | undefined },
    time: number
  ) => void;
  initialSlides: SlideType[];
};

export type BackgroundImageOptionsPropsType = {
  icon: JSX.Element;
  label: string;
  isActive: boolean;
  value: number;
  action: (value: number) => void | Dispatch<SetStateAction<number>>;
};

export type BackgroundPositionPropType = {
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
};

export type BackgroundSizePropType = {
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
};

export type EditorHeaderPropType = {
  deleteObject: () => void;
  goBackInHistory: () => void;
  name: string;
  saveProject: (
    obj: { formattedData?: string; name?: string; previewImage?: string },
    time: number
  ) => void;
};

export type FullScreenDialogPropType = {
  mobileFullDisplay: boolean;
  setMobileFullDisplay: Dispatch<SetStateAction<boolean>>;
  tab: number;
};

export type MobileEditPanelPropType = {
  object: fabric.Object | fabric.Group | undefined | fabric.Text;
  tabClicked: number | null;
  displayMobileEditPanel: boolean;
  setDisplayMobileEditPanel: Dispatch<SetStateAction<boolean>>;
};

export type DropdownPropType = {
  trigger: JSX.Element;
  options: JSX.Element[];
};

export type TextPhrase = {
  id: number;
  formattedData: string;
  previewImg: string;
};

export type AssetResType = {
  assetType: string;
  assetUrl: string;
  collectionId: number;
  id: number;
  journeyId: number;
  memoryId: number;
  uploadedAt: string;
  uploadedBy: number;
  accessRight: string;
  name: string;
};

export type UserDetailsResType = {
  lastName: string;
  firstName: string;
  userName?: string;
  mobileNumber: string;
  active?: boolean | undefined;
  birthDate?: string | undefined;
  country?: string | undefined;
  email?: string | undefined;
  gender?: string | undefined;
  id?: number | undefined;
  profileImage?: string | undefined;
};

export type UserSearchResType = {
  userName: string;
  userId: number;
  firstName: string;
};

export type ProjectInCollectionType = {
  collectionId: number;
  createdAt: string;
  createdBy: number;
  height: number;
  id: number;
  name: string;
  projectType: string;
  updatedAt: string;
  width: number;
};

export type JourneyType = {
  accessRight: string;
  bgColor: string;
  bgImage: string;
  collectionId: number;
  createdAt: string;
  createdBy: number;
  id: number;
  name: string;
};

export type MemoryType = {
  collectionId: number;
  createdAt: string;
  createdBy: number;
  formattedData: string;
  height: number;
  id: number;
  journeyId: number;
  name: string;
  previewImage: string;
  projectType: string;
  updatedAt: string;
  width: number;
  title: string;
  caption: string;
  accessRight: string;
};

export type JourneyDetailsResType = JourneyType & {
  assetList: AssetResType[];
  projectList: MemoryType[];
};

export type JourneyWithAssetType = JourneyType & {
  assetList: AssetResType[];
};

export type JourneyWithMemoriesType = JourneyType & {
  projectList: MemoryType[];
};

export type CollectionDetailsResType = {
  bgColor: string;
  bgImage: string;
  createdAt: string;
  createdBy: number;
  id: number;
  name: string;
  accessRight: string;
  assetList: AssetResType[];
  journeyList: JourneyType[];
};

export type CollectionAssetsResType = CollectionDetailsResType &
  Omit<{ journeyList: JourneyType[] }, keyof CollectionDetailsResType>;

export type CollectionJourneyResType = CollectionDetailsResType &
  Omit<{ assetList: AssetResType[] }, keyof CollectionDetailsResType>;

export type MusicElementType = {
  id: number;
  name: string;
  url: string;
  slideFrom: number;
  slideTo: number;
  startFrom: number;
  duration: number;
};

export type MusicModalPropType = {
  musicModalOpen: boolean;
  setMusicModalOpen: Dispatch<SetStateAction<boolean>>;
  defaultData: MusicElementType | null;
  musicArr: MusicElementType[];
  setMusicArr: Dispatch<SetStateAction<MusicElementType[] | null>>;
};

export type AddMusicModalPropType = {
  addMusicModal: boolean;
  setAddMusicModal: Dispatch<SetStateAction<boolean>>;
};

export type ModalPropsType = PropsWithChildren<{
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  headerLabel: string;
}>;

export type DropdownOptionsType = {
  id: number;
  icon: React.ReactNode;
  name: string;
};

export type DataObjectType =
  | CollectionType
  | AssetResType
  | JourneyType
  | MemoryType
  | null;

export type CollectionJourneyType = CollectionType | JourneyType;

export type BasicStyleCardPropType = PropsWithChildren<{
  type: string;
  name: string;
  onClickHandler?: (() => void) | ((obj: FilesViewerItemType) => void);
  dataObject?: DataObjectType;
}>;

export type NewCardPropsType = BasicStyleCardPropType & {
  needs_approval?: boolean;
  dropdownOptions: DropdownOptionsType[];
};

export type ViewAllCardPropType = BasicStyleCardPropType & {
  needs_approval?: boolean;
  defaultChecked?: boolean;
  onChangeHandler?: () => void;
};

export type TempPropType = {
  entityType: string;
  entityID: number;
  value: number | string;
};

export type DropdownActionModalsPropType = {
  dataObject?: DataObjectType;
  action: number | null;
  actionModal: boolean;
  setActionModal: Dispatch<SetStateAction<boolean>>;
  bulkIds?: number[];
  afterAction?: () => void;
};

export type DropdownButtonPropType = {
  icon: React.ReactNode;
  name: string;
  onClickHandler: () => void;
};

export const AssetTypes = {
  IMAGE: "IMAGE",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
  FOLDER: "FOLDER",
  PDF: "PDF",
};

export const MemoryTypes = {
  IMAGE: "IMAGE",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
  PDF: "PDF",
  CARD: "CARD",
  SLIDESHOW: "SLIDE_SHOW",
};

export const EntityType = {
  COLLECTION: "COLLECTION",
  ASSET: "ASSET",
  JOURNEY: "JOURNEY",
  MEMORY: "MEMORY",
};

export type ProjectDimensionType = {
  width: number;
  height: number;
};

export type UploadAreaCompPropType = {
  setFiles: Dispatch<SetStateAction<File[]>>;
  nextBtnHandler: () => void;
};

export type ViewUploadCompPropType = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  nextBtnHandler: () => void;
  backBtnHandler: () => void;
  nextBtnLabel?: string;
  backBtnLabel?: string;
};

export type SelectFolderPropType = {
  toCollectionId: number;
  toJourneyId: number;
  setToCollectionId: Dispatch<SetStateAction<number>>;
  setToJourneyId: Dispatch<SetStateAction<number>>;
  nextBtnHandler: () => void;
  backBtnHandler: () => void;
  nextBtnLabel?: string;
  backBtnLabel?: string;
  showJourney?: boolean;
};

export type SelectCardSizePropType = {
  setProjectDimension: Dispatch<SetStateAction<ProjectDimensionType | null>>;
  nextBtnHandler: () => void;
  backBtnHandler: () => void;
  nextBtnLabel?: string;
  backBtnLabel?: string;
};

export type LevelResType = {
  name: string;
  id: number;
  accessType: string;
  childList: unknown[];
};

export type CollectionLevelResType = {
  name: string;
  id: number;
  accessType: string;
  childList: LevelResType[];
};

export type FolderRowPropType = {
  toCollectionId: number;
  toJourneyId: number;
  setToCollectionId: Dispatch<SetStateAction<number>>;
  setToJourneyId: Dispatch<SetStateAction<number>>;
  collectionDetails: CollectionLevelResType;
  showJourney?: boolean;
};

export type CreateProjectPayloadType = {
  caption: string;
  collectionId: number;
  formattedData: string;
  height: number;
  journeyId: number;
  name: string;
  previewImage: string;
  projectType: string;
  title: string;
  width: number;
};

export type ProjectResType = CreateProjectPayloadType & {
  id: number;
};

export type MoveCopyModalPropType = {
  mode: string;
  entityType: string;
  dataObject?: DataObjectType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
  afterAction?: () => void;
  bulkIds?: number[];
};

export type CommonHierarchyType = {
  name: string;
  id: number;
  url: string;
  childs: { name: string; id: number; url: string; childs: never[] }[];
};

export type HierarchyType = {
  name: string;
  id: number;
  url: string;
  childs: {
    name: string;
    id: number;
    url: string;
    childs: { name: string; id: number; url: string; childs: never[] }[];
  }[];
};

export type DropEventHandlerType = React.DragEventHandler<HTMLLabelElement>;
export type DragOverEventHandlerType = React.DragEventHandler<HTMLLabelElement>;

export type ToolTipIconPropType = {
  icon: React.ReactNode;
  label: string;
  onClickHandler?: () => void;
};

export const StageLists = {
  UPLOAD_SELECT: 1,
  VIEW_UPLOADS: 2,
  CARD_SIZE: 3,
  SELECT_FOLDER: 4,
  SAVE_AS: 5,
};

export const FileTypeMap: { [key: string]: string } = {
  png: MemoryTypes.IMAGE,
  jpg: MemoryTypes.IMAGE,
  jpeg: MemoryTypes.IMAGE,
  webp: MemoryTypes.IMAGE,
  svg: MemoryTypes.IMAGE,
  mp3: MemoryTypes.AUDIO,
  wav: MemoryTypes.AUDIO,
  ogg: MemoryTypes.AUDIO,
  aac: MemoryTypes.AUDIO,
  mp4: MemoryTypes.VIDEO,
  mov: MemoryTypes.VIDEO,
  avi: MemoryTypes.VIDEO,
  webm: MemoryTypes.VIDEO,
  pdf: MemoryTypes.PDF,
};

export const AccessTypeGroups = {
  OWNER: ["COLLECTION_OWNER", "JOURNEY_OWNER", "MEMORY_OWNER"],
  EDIT: ["COLLECTION_EDIT", "JOURNEY_EDIT", "MEMORY_EDIT"],
  VIEW_ONLY: ["COLLECTION_VIEW_ONLY", "JOURNEY_VIEW_ONLY", "MEMORY_VIEW_ONLY"],
  ADD_ONLY: ["COLLECTION_ADD_ONLY", "JOURNEY_ADD_ONLY", "MEMORY_ADD_ONLY"],
  ADD_VIEW: ["COLLECTION_ADD_VIEW", "JOURNEY_ADD_VIEW", "MEMORY_ADD_VIEW"],
};

export const SourceMemory = {
  MEMORY: "MEMORY",
  MEMORY_DASHBOARD: "MEMORY-DASHBOARD",
  UPLOAD: "UPLOAD",
};

export type ShareModalPropType = {
  entityType: string;
  dataObject?: DataObjectType;
  setActionModal: Dispatch<SetStateAction<boolean>>;
};

export type UserSearchCompPropType = {
  selecteduser: UserSearchResType[];
  setSelectedUsers: Dispatch<SetStateAction<UserSearchResType[]>>;
};

export type ManageAccessResType = {
  accessType: string;
  entityId: number;
  userId: number;
  name: string;
  accessRight: string;
};

export type PermissionType = {
  name: string;
  value: string;
};

export type PermissionUserCardPropType = ManageAccessResType & {
  allAccessRights: PermissionType[];
};

export type PublicEntityResType = {
  id: number;
  accessType: string;
  entityId: number;
  link: string;
};
