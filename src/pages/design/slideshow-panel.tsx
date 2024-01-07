/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { IconPlayerPlay } from "@tabler/icons-react";
import React, { useContext, useEffect, useState, useRef } from "react";
import { SlideCardType, CanvasContextType, SlideMusic } from "../../types";
import { cn, dataURLtoBlob } from "../../utils";
import { CanvasContext } from "../../context/canvasContext";
import AudioPlayer from "../../components/audio-player";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const Slide = ({
  isActive,
  slideNumber,
  slide,
  setSelectedMusic,
}: SlideCardType) => {
  const { fabricRef, setActiveSlide, setSlides, slides } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const onClickSlide = () => {
    setActiveSlide(slideNumber);
    setSelectedMusic(null);
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

  const onSelectMusic = (event: React.ChangeEvent) => {
    const file = event.target.files[0];
    if (file) {
      // const objectUrl = URL.createObjectURL(file);
      setSelectedMusic({
        name: file.name,
        url: "https://www.computerhope.com/jargon/m/example.mp3",
        startTime: 0,
        duration: 0,
      });
    }
  };

  const changeDuration = (e, index) => {
    console.log(e.target.value, index);
    const slides_copy = [...slides];
    slides_copy[index].duration = parseInt(e.target.value);
    setSlides(slides_copy);
  };

  const getMusicDetails = () => {
    console.log(slides[slideNumber]);
    setSelectedMusic({
      name: slides[slideNumber].music?.name || "",
      url: slides[slideNumber].music?.url || "",
      duration: slides[slideNumber].music?.duration || 0,
      startTime: slides[slideNumber].music?.startTime || 0,
      x: slides[slideNumber].music?.x || 0,
    });
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
            onChange={(e) => changeDuration(e, slideNumber)}
          />
          <span className="-ml-1 text-xs">s</span>
        </div>
      </div>
      {isActive && (
        <div className="">
          {slides[slideNumber].music ? (
            <button
              onClick={getMusicDetails}
              className="text-center text-xs mt-2 inline-block bg-primary-400 text-white w-full py-1"
            >
              Edit Music
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default function SlideshowPane() {
  const { fabricRef, slides, setSlides, activeSlide } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const ffmpegRef = useRef(new FFmpeg());

  const [selectedMusic, setSelectedMusic] = useState<SlideMusic | null>(null);

  const addSlide = () => {
    setSlides([
      ...slides,
      { content: "", duration: 2, previewImg: "", history: [] },
    ]);
  };

  const getTotalDuration = () => {
    let t = 0;
    for (let i = 0; i < slides.length; i++) {
      t += slides[i].duration || 0;
    }
    return <>{t}</>;
  };

  const createEachSlideVideo = async (slide: SlideType) => {
    console.log(slide);
    const virtualCanvas = new fabric.Canvas("");
    virtualCanvas.setDimensions({
      //@ts-ignore
      width: fabricRef.current.getWidth() / fabricRef.current.getZoom(),
      //@ts-ignore
      height: fabricRef.current.getHeight() / fabricRef.current.getZoom(),
    });
    virtualCanvas.loadFromJSON(slide.content, async () => {
      console.log(virtualCanvas.toDataURL({ format: "png" }));
      const imgBlob = dataURLtoBlob(virtualCanvas.toDataURL({ format: "png" }));
      await ffmpegRef.current.writeFile("image.png", await fetchFile(imgBlob));
      console.log("Loaded Image");
      const music = await fetch(slide.music.url);
      console.log(music);
      await ffmpegRef.current.writeFile(
        "sound.mp3",
        await fetchFile(slide.music.url)
      );
      console.log("Loaded Music");
      await ffmpeg.run(
        "-framerate",
        "1/10",
        "-i",
        "image.png",
        "-i",
        "sound.mp3",
        "-c:v",
        "libx264",
        "-t",
        "10",
        "-pix_fmt",
        "yuv420p",
        "-vf",
        "scale=1080:1080",
        "test.mp4"
      );
      console.log("Video Made");
      const createdVideo = await ffmpegRef.current.readFile("test.mp4");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([createdVideo.buffer]));
      link.download = "abc.png";
      link.click();
    });
  };

  const createPreview = async () => {
    for (let i = 0; i < slides.length; i++) {
      createEachSlideVideo(slides[i]);
    }
  };

  const loadFFMPEG = async () => {
    console.log("Loading FFMPEG");
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    console.log("Loaded FFMPEG");
  };

  useEffect(() => {
    loadFFMPEG();
  }, []);

  return (
    <div className=" bg-white w-full p-5">
      <div className="slide_section flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <button
            className="h-14 w-14 rounded-full text-primary-700 hover:text-white bg-primary-50 hover:bg-primary-500 flex justify-center items-center"
            onClick={createPreview}
          >
            <IconPlayerPlay />
          </button>
          <span className="text-xs">Total - {getTotalDuration()}s</span>
        </div>

        {slides.map((slide, index) => (
          <Slide
            key={index}
            isActive={activeSlide == index}
            slideNumber={index}
            slide={slide}
            setSelectedMusic={setSelectedMusic}
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
        {selectedMusic && (
          <AudioPlayer
            name={selectedMusic.name}
            url={selectedMusic.url}
            startTime={selectedMusic.startTime}
            duration={slides[activeSlide].duration || 0}
            setSelectedMusic={setSelectedMusic}
            x={selectedMusic.x || 0}
          />
        )}
      </div>
    </div>
  );
}
