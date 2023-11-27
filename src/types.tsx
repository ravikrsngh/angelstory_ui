import { Dispatch, SetStateAction } from "react";

export type SlideMusic = {
  name: string;
  url: string;
  startTime: number;
  duration: number;
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
  name: string
}

export type CollectionCardType = {
  name: string
  id: number
}


export type CreateProjectInputType = {
  collectionId: string | null | number;
  height: string | null;
  name: string;
  projectType: string | null;
  width: string | null;
};

export type CreateProjectPropType = {
  displayCreateProject: boolean;
  setDisplayCreateProject: Dispatch<SetStateAction<boolean>>;
  step: number;
  initalValue: {
    width: string | null;
    height: string | null;
    projectType: string | null;
  }
};

export type CreateProjectStepPropType = {
  projData: CreateProjectInputType,
  setProjData: Dispatch<SetStateAction<CreateProjectInputType>>;
  setStep: Dispatch<SetStateAction<number>>
}