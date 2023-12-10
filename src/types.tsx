import { Dispatch, SetStateAction } from "react";

export type SlideMusic = {
  name: string;
  url: string;
  startTime: number;
  duration: number;
  x: number;
}

export type SlideType = {
  content: string;
  duration: number;
  previewImg: string | undefined;
  history: (string | null)[];
  music?: SlideMusic
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
  setSelectedMusic: Dispatch<SetStateAction<SlideMusic | null>>
};


export type CanvasContextType = {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  recordChange: () => void;
  slides:SlideType[];
  setSlides: Dispatch<SetStateAction<SlideType[]>>;
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
};

export type EditObjectType = {
  object: fabric.Object | fabric.Group | undefined | fabric.Text
}


export type EditInputBoxType = {
  containerClassName?: string;
  icon?: React.ReactNode ;
  inputClassName?: string;
  type?: string;
  id?: string;
  defaultValue?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number ;
  min?: number;
  max?:number
}

export type GoogleFontResponseType = {
  family: string
  variants: string[]
  subsets: string[]
  version: string
  lastModified: string
  category: string
  kind: string
  menu: string
}







// Template API Data
export type TemplateType =  {
  id: number
  previewImage: string
  formattedData: string
  price: number
  collectionId: number
  name: string
  createdAt: string
  updatedAt: string
  createdBy: number
  premium: boolean
}


export type CollectionType = {
  createdAt: string;
  createdBy: number;
  id: number;
  name: string;
  bgColor: string
}

export type CollectionCardType = {
  name: string
  id: number;
  bgColor: string
}


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
  projData: CreateProjectInputType,
  setProjData: Dispatch<SetStateAction<CreateProjectInputType>>;
  setStep: Dispatch<SetStateAction<number>>
}



export type SizeResType = {
  id:number;
  width: number;
  height: number;
  label: string;
}


export type DesignUpdateType = {
  width: number;
  height: number;
  formattedData: string;
  projectType: string;
  name: string;
  collectionId: number;
  previewImage: string
}

export type DesignLoaderPropType = {
  ratio: number;
  originalWidth: number;
  name: string;
  projectType: string;
  saveProject: (obj: { formattedData: string }) => void;
  initialSlides: SlideType[]
}