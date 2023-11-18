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