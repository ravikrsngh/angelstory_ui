import { IconPlayerPlay } from "@tabler/icons-react";
import React, { useContext } from "react";
import { SlideShowPanelType, SlideCardType } from "../../types";
import { cn } from "../../utils";
import { CanvasContext } from "../../context/canvasContext";

const Slide = ({
  isActive,
  slideNumber,
  setActiveSlide,
  slide,
}: SlideCardType) => {
  const { fabricRef } = useContext(CanvasContext);
  const onClickSlide = () => {
    setActiveSlide(slideNumber);
    if (slide.content) {
      fabricRef.current?.loadFromJSON(slide.content, () => {});
      fabricRef.current?.renderAll();
    } else {
      fabricRef.current?.clear();
      fabricRef?.current?.setBackgroundColor(
        "#FFF",
        fabricRef?.current?.renderAll.bind(fabricRef?.current)
      );
    }
  };
  return (
    <div
      className={cn(
        "h-14 min-w-[56px] rounded-md overflow-hidden w-fit relative border border-slate-200",
        isActive && "border-2 border-primary-600"
      )}
      onClick={onClickSlide}
    >
      <img src={slide.previewImg} className="h-full w-auto" />
      <input
        type="number"
        className="absolute bottom-1 left-1 w-10 text-xs bg-transparent"
        defaultValue={slide.duration}
      />
    </div>
  );
};

export default function SlideshowPanel({
  slides,
  setSlides,
  activeSlide,
  setActiveSlide,
}: SlideShowPanelType) {
  const addSlide = () => {
    setSlides([...slides, { content: "", duration: 2, previewImg: "" }]);
  };

  return (
    <div className=" bg-white w-full p-5">
      <div className="slide_section flex items-center gap-4">
        <button className="h-14 w-14 rounded-full text-primary-700 hover:text-white bg-primary-50 hover:bg-primary-500 flex justify-center items-center">
          <IconPlayerPlay />
        </button>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            isActive={activeSlide == index}
            slideNumber={index}
            setActiveSlide={setActiveSlide}
            slide={slide}
          />
        ))}
        <div
          className={cn(
            "h-14 w-14 flex justify-center items-center bg-primary-100 rounded-md"
          )}
          onClick={addSlide}
        >
          +
        </div>
      </div>
    </div>
  );
}
