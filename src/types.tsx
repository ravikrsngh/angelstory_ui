import { Dispatch, SetStateAction } from "react";

export type CanvasContextType = {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  recordChange: () => void;
};

export type SlideType = {
  content: string;
  duration: number;
  previewImg: string | undefined;
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
  setActiveSlide: Dispatch<SetStateAction<number>>;
  slide: SlideType;
};
