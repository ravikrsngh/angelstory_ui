import { IconPlayerPlay } from "@tabler/icons-react";
import React, { useContext } from "react";
import {
  SlideShowPanelType,
  SlideCardType,
  CanvasContextType,
} from "../../types";
import { cn } from "../../utils";
import { CanvasContext } from "../../context/canvasContext";
import audioFile from "./../../assets/test.mp3";

const Slide = ({
  isActive,
  slideNumber,
  setActiveSlide,
  slide,
}: SlideCardType) => {
  const { fabricRef } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
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

  const onSelectMusic = () => {
    console.log("music_selected");
  };
  return (
    <div>
      <div
        className={cn(
          "h-14 min-w-[56px] rounded-md overflow-hidden w-fit relative border border-slate-200",
          isActive && "border-2 border-primary-600"
        )}
        onClick={onClickSlide}
      >
        <img src={slide.previewImg} className="h-full w-auto" />
        <div className="absolute bottom-1 left-1 flex">
          <input
            type="text"
            className=" w-3 text-xs bg-transparent outline-none"
            defaultValue={slide.duration}
          />
          <span className="-ml-1 text-xs">s</span>
        </div>
      </div>
      <div className="">
        <input
          type="file"
          name="file"
          id="music-upload-file"
          className="w-0 h-0 overflow-hidden"
          onChange={onSelectMusic}
        />
        <label
          htmlFor="music-upload-file"
          className="text-center text-xs mt-2 inline-block bg-primary-400 text-white w-full py-1"
        >
          Add Music
        </label>
      </div>
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
      <div className="slide_section flex gap-4">
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
      <div className="my-4">
        <audio src={audioFile} controls className="w-full"></audio>
      </div>
    </div>
  );
}
