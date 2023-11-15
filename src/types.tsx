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